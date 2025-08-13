import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { sendOrderNotificationToAdmin } from '@/lib/email'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const orderId = params.id
    const { estimatedDelivery } = await request.json()

    // Fetch the order
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
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Check if order can be confirmed
    if (order.status !== 'PENDING') {
      return NextResponse.json(
        { error: `Cannot confirm order with status: ${order.status}` },
        { status: 400 }
      )
    }

    // Update order status to processing
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PROCESSING',
        paymentStatus: order.paymentMethod === 'COD' ? 'PENDING' : 'PAID',
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

    // TODO: Send confirmation email to customer
    // You can create a customer notification function similar to admin notifications

    return NextResponse.json({
      message: 'Order confirmed successfully',
      order: {
        id: updatedOrder.id,
        orderNumber: updatedOrder.orderNumber,
        status: updatedOrder.status,
        paymentStatus: updatedOrder.paymentStatus,
        estimatedDelivery: estimatedDelivery,
        updatedAt: updatedOrder.updatedAt
      }
    })

  } catch (error) {
    console.error('Error confirming order:', error)
    return NextResponse.json(
      { error: 'Failed to confirm order' },
      { status: 500 }
    )
  }
}
