import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role = "CUSTOMER" } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // For demo purposes, we'll just return success
    // In a real app, this would save to database
    const userData = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: role.toLowerCase(),
    }

    const response = NextResponse.json({
      user: userData,
      message: "Registration successful",
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
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
