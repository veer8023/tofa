import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const { trackingNumber, courier, status } = await request.json()

    if (!trackingNumber) {
      return NextResponse.json(
        { error: 'Tracking number is required' },
        { status: 400 }
      )
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        trackingNumber: trackingNumber.trim(),
        status: status?.toUpperCase() || 'SHIPPED',
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
                unit: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      order,
      message: 'Tracking number updated successfully'
    })

  } catch (error) {
    console.error('Error updating tracking number:', error)
    return NextResponse.json(
      { error: 'Failed to update tracking number' },
      { status: 500 }
    )
  }
}
