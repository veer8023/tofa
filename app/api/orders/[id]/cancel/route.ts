import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('Cancel order request for ID:', params.id)
    
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      console.log('Unauthorized: No session or user email')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const orderId = params.id
    console.log('Fetching order for user:', session.user.email)

    // Fetch the order to verify ownership and current status
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        }
      }
    })

    if (!order) {
      console.log('Order not found:', orderId)
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    console.log('Order found:', {
      id: order.id,
      status: order.status,
      userEmail: order.user.email,
      sessionEmail: session.user.email
    })

    // Verify order ownership
    if (order.user.email !== session.user.email) {
      console.log('Unauthorized: Order ownership mismatch')
      return NextResponse.json(
        { error: 'Unauthorized - You can only cancel your own orders' },
        { status: 403 }
      )
    }

    // Check if order can be cancelled
    const cancellableStatuses = ['PENDING', 'PROCESSING']
    if (!cancellableStatuses.includes(order.status)) {
      return NextResponse.json(
        { error: `Cannot cancel order with status: ${order.status}. Only PENDING and PROCESSING orders can be cancelled.` },
        { status: 400 }
      )
    }

    console.log('Cancelling order:', orderId)

    // Update order status to cancelled
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CANCELLED',
        updatedAt: new Date()
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true
          }
        }
      }
    })

    console.log('Order cancelled successfully:', updatedOrder.id)

    // TODO: In a real application, you would also:
    // 1. Process refund if payment was already made
    // 2. Restore inventory quantities
    // 3. Send cancellation email to customer
    // 4. Notify admin about the cancellation

    // Restore inventory (basic implementation)
    for (const item of order.orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity
          }
        }
      })
    }

    return NextResponse.json({
      message: 'Order cancelled successfully',
      order: {
        id: updatedOrder.id,
        orderNumber: updatedOrder.orderNumber,
        status: updatedOrder.status,
        total: updatedOrder.total,
        createdAt: updatedOrder.createdAt,
        updatedAt: updatedOrder.updatedAt
      }
    })

  } catch (error) {
    console.error('Error cancelling order:', error)
    return NextResponse.json(
      { error: 'Failed to cancel order' },
      { status: 500 }
    )
  }
}
