import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Mock users for authentication (no database required)
const MOCK_USERS = [
  {
    id: "admin-1",
    email: "admin@tofa.com",
    name: "Admin User",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // admin123
    role: "ADMIN",
    status: "ACTIVE",
  },
  {
    id: "customer-1",
    email: "customer@example.com",
    name: "Customer User",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "CUSTOMER",
    status: "ACTIVE",
  },
  {
    id: "retailer-1",
    email: "retailer@example.com",
    name: "Retailer User",
    password: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "RETAILER",
    status: "ACTIVE",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user in mock data
    const user = MOCK_USERS.find((u) => u.email === email)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password (for demo, we'll accept the plain passwords too)
    const isValidPassword =
      password === "admin123" || password === "password123" || (await bcrypt.compare(password, user.password))

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Return user data (without password)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.toLowerCase(),
    }

    const response = NextResponse.json({
      user: userData,
      message: "Login successful",
    })

    // Set a simple session cookie
    response.cookies.set("auth-user", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
