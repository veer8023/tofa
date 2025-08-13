import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/auth"
import { userLoginSchema } from "@/lib/validation"
import { handleApiError, validationError, unauthorizedError } from "@/lib/error-handler"
import { log } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate input
    const validatedData = userLoginSchema.parse(data)
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (!user) {
      throw unauthorizedError("Invalid email or password")
    }
    
    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.password)
    
    if (!isValidPassword) {
      log.authError(user.id, 'login', 'Invalid password')
      throw unauthorizedError("Invalid email or password")
    }
    
    log.userAction(user.id, 'login', { email: user.email })
    
    // Return user data (without password)
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
    
    const response = NextResponse.json({
      user: userData,
      message: "Login successful",
    })
    
    // Set session cookie
    response.cookies.set("auth-user", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })
    
    return response
    
  } catch (error) {
    log.apiError('/api/auth/login', error)
    return handleApiError(error)
  }
}
