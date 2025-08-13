import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Use searchParams from the request object directly
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")

    if (userId) {
      // Fetch a single user by ID
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      return NextResponse.json(user)
    }

    // Fetch all users
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error("User fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
