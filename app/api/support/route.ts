import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { log } from "@/lib/logger"

// GET support tickets for user or admin
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const isAdmin = session.user.role === "ADMIN"
    const status = searchParams.get("status")
    const category = searchParams.get("category")
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

    if (category && category !== "all") {
      where.category = category.toUpperCase()
    }

    const tickets = await prisma.supportTicket.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        order: {
          select: { id: true, orderNumber: true, createdAt: true }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    })

    const total = await prisma.supportTicket.count({ where })

    return NextResponse.json({
      tickets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error("Error fetching support tickets:", error)
    return NextResponse.json(
      { error: "Failed to fetch support tickets" },
      { status: 500 }
    )
  }
}

// POST - Create new support ticket
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, category, subject, description, priority = "MEDIUM" } = body

    // Validate required fields
    if (!category || !subject || !description) {
      return NextResponse.json(
        { error: "Category, subject, and description are required" },
        { status: 400 }
      )
    }

    // If orderId is provided, verify it belongs to the user
    if (orderId) {
      const order = await prisma.order.findFirst({
        where: {
          id: orderId,
          userId: session.user.id
        }
      })

      if (!order) {
        return NextResponse.json(
          { error: "Order not found or does not belong to user" },
          { status: 400 }
        )
      }
    }

    // Create support ticket
    const ticket = await prisma.supportTicket.create({
      data: {
        userId: session.user.id,
        orderId: orderId || null,
        category: category.toUpperCase(),
        subject,
        description,
        priority: priority.toUpperCase(),
        status: "OPEN"
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        order: {
          select: { id: true, orderNumber: true }
        }
      }
    })

    log.userAction(session.user.id, 'support_ticket_created', {
      ticketId: ticket.id,
      category,
      priority,
      hasOrder: !!orderId
    })

    return NextResponse.json({
      success: true,
      ticket,
      message: "Support ticket created successfully"
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating support ticket:", error)
    return NextResponse.json(
      { error: "Failed to create support ticket" },
      { status: 500 }
    )
  }
}
