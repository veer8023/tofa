import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { courierTrackingService } from '@/lib/courier-tracking'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const trackingNumber = searchParams.get('trackingNumber')
    const orderNumber = searchParams.get('orderNumber')
    const realTimeTracking = searchParams.get('realTime') === 'true'

    if (!trackingNumber && !orderNumber) {
      return NextResponse.json(
        { error: 'Tracking number or order number is required' },
        { status: 400 }
      )
    }

    let order

    if (trackingNumber) {
      // Search by tracking number
      order = await prisma.order.findFirst({
        where: {
          trackingNumber: trackingNumber
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
                  id: true,
                  name: true,
                  image: true,
                  unit: true
                }
              }
            }
          }
        }
      })
    } else if (orderNumber) {
      // Search by order number
      order = await prisma.order.findFirst({
        where: {
          orderNumber: orderNumber
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
                  id: true,
                  name: true,
                  image: true,
                  unit: true
                }
              }
            }
          }
        }
      })
    }

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Get real-time tracking data if requested and tracking number exists
    let trackingData = null
    if (realTimeTracking && order.trackingNumber) {
      try {
        const courierService = 'delhivery' // Default courier service
        trackingData = await courierTrackingService.trackPackage(
          order.trackingNumber,
          courierService
        )
      } catch (error) {
        console.error('Real-time tracking failed:', error)
        // Continue without real-time data
      }
    }

    // Transform the order data with type assertion
    const orderWithIncludes = order as any

    const transformedOrder = {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      trackingNumber: order.trackingNumber,
      courierService: "delhivery",
      estimatedDelivery: order.createdAt,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      total: order.total,
      subtotal: order.subtotal,
      shippingCost: order.shippingCost,
      tax: order.tax,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      user: orderWithIncludes.user ? {
        name: orderWithIncludes.user.name,
        email: orderWithIncludes.user.email
      } : null,
      orderItems: orderWithIncludes.orderItems ? orderWithIncludes.orderItems.map((item: any) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        orderType: item.orderType,
        product: {
          id: item.product.id,
          name: item.product.name,
          image: item.product.image,
          unit: item.product.unit
        }
      })) : [],
      shippingAddress: {
        name: order.shippingName,
        phone: order.shippingPhone,
        address: order.shippingAddress,
        city: order.shippingCity,
        state: order.shippingState,
        pincode: order.shippingPincode
      },
      // Include real-time tracking data if available
      realTimeTracking: trackingData
    }

    return NextResponse.json({
      success: true,
      order: transformedOrder
    })

  } catch (error) {
    console.error('Error tracking order:', error)
    return NextResponse.json(
      { error: 'Failed to track order' },
      { status: 500 }
    )
  }
}
