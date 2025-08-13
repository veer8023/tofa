import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { log } from "@/lib/logger"

// GET return requests for user or admin
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const isAdmin = session.user.role === "ADMIN"
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    let where: any = {}
    
    if (!isAdmin) {
      where.userId = session.user.id
    }
    
    if (status && status !== "all") {
      where.status = status.toUpperCase()
    }

    const returns = await prisma.returnRequest.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        order: {
          select: { id: true, orderNumber: true, createdAt: true }
        },
        orderItem: {
          include: {
            product: {
              select: { id: true, name: true, image: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    })

    const total = await prisma.returnRequest.count({ where })

    return NextResponse.json({
      returns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error("Error fetching return requests:", error)
    return NextResponse.json(
      { error: "Failed to fetch return requests" },
      { status: 500 }
    )
  }
}

// POST - Create new return request
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, items, reason, description } = body

    // Validate required fields
    if (!orderId || !items || !reason || !description) {
      return NextResponse.json(
        { error: "Order ID, items, reason, and description are required" },
        { status: 400 }
      )
    }

    // Verify order belongs to user and is delivered
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
        status: "DELIVERED"
      },
      include: {
        orderItems: true
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: "Order not found or not eligible for return" },
        { status: 400 }
      )
    }

    // Check if return window is still open (7 days)
    const deliveryDate = order.updatedAt // Assuming updatedAt is when delivered
    const returnDeadline = new Date(deliveryDate)
    returnDeadline.setDate(returnDeadline.getDate() + 7)
    
    if (new Date() > returnDeadline) {
      return NextResponse.json(
        { error: "Return window has expired (7 days from delivery)" },
        { status: 400 }
      )
    }

    // Create return requests for each selected item
    const returnRequests = []
    
    for (const itemId of items) {
      const orderItem = order.orderItems.find(item => item.id === itemId)
      if (!orderItem) {
        continue
      }

      const returnRequest = await prisma.returnRequest.create({
        data: {
          userId: session.user.id,
          orderId,
          orderItemId: itemId,
          reason: reason.toUpperCase(),
          description,
          status: "PENDING"
        },
        include: {
          orderItem: {
            include: {
              product: {
                select: { id: true, name: true, image: true }
              }
            }
          }
        }
      })

      returnRequests.push(returnRequest)
    }

    log.userAction(session.user.id, 'return_request_created', {
      orderId,
      itemCount: returnRequests.length,
      reason
    })

    return NextResponse.json({
      success: true,
      returnRequests,
      message: `Return request submitted for ${returnRequests.length} item(s)`
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating return request:", error)
    return NextResponse.json(
      { error: "Failed to create return request" },
      { status: 500 }
    )
  }
}
