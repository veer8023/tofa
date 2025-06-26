import { type NextRequest, NextResponse } from "next/server"

// Mock users data
const MOCK_USERS = [
  {
    id: "admin-1",
    email: "admin@tofa.com",
    name: "Admin User",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: "customer-1",
    email: "customer@example.com",
    name: "Customer User",
    role: "CUSTOMER",
    status: "ACTIVE",
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    lastLogin: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "retailer-1",
    email: "retailer@example.com",
    name: "Retailer User",
    role: "RETAILER",
    status: "ACTIVE",
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    lastLogin: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")
    const status = searchParams.get("status")

    let users = [...MOCK_USERS]

    if (role) {
      users = users.filter((user) => user.role.toLowerCase() === role.toLowerCase())
    }

    if (status) {
      users = users.filter((user) => user.status.toLowerCase() === status.toLowerCase())
    }

    return NextResponse.json(users)
  } catch (error) {
    console.error("Users fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
