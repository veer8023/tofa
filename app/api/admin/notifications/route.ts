import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

// GET recent notifications for admin
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "10")
    const since = searchParams.get("since") // ISO timestamp for polling

    // Build where clause for recent orders
    let whereClause: any = {}
    if (since) {
      whereClause.createdAt = {
        gt: new Date(since)
      }
    }

    // Get recent orders as notifications
    const recentOrders = await prisma.order.findMany({
      where: whereClause,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        _count: {
          select: { orderItems: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: limit
    })

    // Transform orders into notification format
    const notifications = recentOrders.map(order => ({
      id: order.id,
      type: "NEW_ORDER",
      title: `New Order #${order.orderNumber}`,
      message: `${order.user.name || 'Unknown Customer'} placed an order worth ₹${order.total} with ${order._count.orderItems} items`,
      customerName: order.user.name,
      customerEmail: order.user.email,
      orderNumber: order.orderNumber,
      total: order.total,
      itemCount: order._count.orderItems,
      status: order.status,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      isRead: false, // For future read/unread functionality
      actionUrl: `/admin/orders?orderId=${order.id}`
    }))

    return NextResponse.json({
      notifications,
      count: notifications.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error("Error fetching admin notifications:", error)
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    )
  }
}
