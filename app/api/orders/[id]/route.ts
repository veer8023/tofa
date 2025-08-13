import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { log } from "@/lib/logger"

// GET single order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderId = params.id

    // Build where clause based on user role
    let where: any = { id: orderId }
    if (session.user.role !== "ADMIN") {
      // Regular users can only see their own orders
      where.userId = session.user.id
    }

    const order = await prisma.order.findUnique({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        orderItems: {
          include: {
            product: {
              select: { id: true, name: true, image: true, unit: true }
            }
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order })

  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    )
  }
}

// PATCH - Update order (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderId = params.id
    const body = await request.json()
    const { status, paymentStatus, notes, trackingNumber } = body

    // Validate status if provided
    const validStatuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      )
    }

    // Validate payment status if provided
    const validPaymentStatuses = ["PENDING", "PAID", "FAILED"]
    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return NextResponse.json(
        { error: "Invalid payment status" },
        { status: 400 }
      )
    }

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: { select: { email: true, name: true } } }
    })

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Update order
    const updateData: any = {
      updatedAt: new Date()
    }

    if (status) updateData.status = status
    if (paymentStatus) updateData.paymentStatus = paymentStatus
    if (notes !== undefined) updateData.notes = notes
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        orderItems: {
          include: {
            product: {
              select: { id: true, name: true, image: true, unit: true }
            }
          }
        }
      }
    })

    // Log the update
    log.userAction(session.user.id, 'order_updated', {
      orderId: updatedOrder.id,
      orderNumber: updatedOrder.orderNumber,
      oldStatus: existingOrder.status,
      newStatus: status || existingOrder.status,
      updatedFields: Object.keys(updateData)
    })

    // TODO: Send notification to customer about status update
    // TODO: Send SMS/WhatsApp notification if shipped/delivered

    return NextResponse.json({
      success: true,
      order: updatedOrder
    })

  } catch (error) {
    console.error("Error updating order:", error)
    log.authError(session?.user?.id || 'unknown', 'order_update_failed', `${error}`)
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    )
  }
}
