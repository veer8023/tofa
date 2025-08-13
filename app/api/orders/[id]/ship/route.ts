import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

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
    const { trackingNumber, courierService } = await request.json()

    if (!trackingNumber || !courierService) {
      return NextResponse.json(
        { error: 'Tracking number and courier service are required' },
        { status: 400 }
      )
    }

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

    // Check if order can be shipped
    if (order.status !== 'PROCESSING') {
      return NextResponse.json(
        { error: `Cannot ship order with status: ${order.status}` },
        { status: 400 }
      )
    }

    // Update order status to shipped with tracking information
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'SHIPPED',
        trackingNumber: trackingNumber,
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

    // TODO: Send shipping notification email to customer
    // Include tracking number and courier service information

    return NextResponse.json({
      message: 'Order shipped successfully',
      order: {
        id: updatedOrder.id,
        orderNumber: updatedOrder.orderNumber,
        status: updatedOrder.status,
        trackingNumber: updatedOrder.trackingNumber,
        courierService: courierService,
        updatedAt: updatedOrder.updatedAt
      }
    })

  } catch (error) {
    console.error('Error shipping order:', error)
    return NextResponse.json(
      { error: 'Failed to ship order' },
      { status: 500 }
    )
  }
}
