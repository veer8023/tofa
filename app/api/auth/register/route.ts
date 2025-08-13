import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"
import { userRegistrationSchema } from "@/lib/validation"
import { handleApiError, validationError } from "@/lib/error-handler"
import { log } from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate input
    const validatedData = userRegistrationSchema.parse(data)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      throw validationError("User with this email already exists")
    }
    
    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role,
        phone: validatedData.phone,
        address: validatedData.address,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })
    
    log.userAction(user.id, 'register', { email: user.email, role: user.role })
    
    return NextResponse.json({
      message: "User registered successfully",
      user
    }, { status: 201 })
    
  } catch (error) {
    log.apiError('/api/auth/register', error)
    return handleApiError(error)
  }
}
