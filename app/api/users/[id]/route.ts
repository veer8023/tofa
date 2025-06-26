import { type NextRequest, NextResponse } from "next/server"

// Mock user data
const MOCK_USER = {
  id: "user-1",
  email: "user@example.com",
  name: "Sample User",
  role: "CUSTOMER",
  status: "ACTIVE",
  createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  lastLogin: new Date(Date.now() - 86400000).toISOString(),
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    return NextResponse.json({ ...MOCK_USER, id: params.id })
  } catch (error) {
    console.error("User fetch error:", error)
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()

    const updatedUser = {
      ...MOCK_USER,
      ...updates,
      id: params.id,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("User update error:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}
