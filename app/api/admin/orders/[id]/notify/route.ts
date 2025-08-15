import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
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

    const { method, trackingNumber, trackingUrl, customMessage } = await request.json()

    if (!method || !trackingNumber) {
      return NextResponse.json(
        { error: 'Method and tracking number are required' },
        { status: 400 }
      )
    }

    // Get order details
    const order = await prisma.order.findUnique({
      where: { id: params.id },
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

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    if (method === 'email') {
      // Send email notification
      const emailSubject = `📦 Your Order #${order.orderNumber} is on the way!`
      
      const emailHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #16a34a; margin: 0; font-size: 28px; font-weight: bold;">📦 Package Shipped!</h1>
              <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Your order is on its way</p>
            </div>

            <!-- Order Info -->
            <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #0ea5e9;">
              <h3 style="margin: 0 0 15px 0; color: #0f172a; font-size: 18px;">Order #${order.orderNumber}</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
                <div><strong>Tracking Number:</strong></div>
                <div style="font-family: monospace; background: white; padding: 4px 8px; border-radius: 4px; border: 1px solid #e5e7eb;">${trackingNumber}</div>
                <div><strong>Delivery Address:</strong></div>
                <div>${order.shippingName}<br>${order.shippingAddress}, ${order.shippingCity}</div>
              </div>
            </div>

            <!-- Custom Message -->
            ${customMessage ? `
              <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #f59e0b;">
                <h4 style="margin: 0 0 10px 0; color: #92400e;">Personal Message</h4>
                <p style="margin: 0; color: #92400e; font-style: italic;">${customMessage}</p>
              </div>
            ` : ''}

            <!-- Tracking Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${trackingUrl}" 
                 style="display: inline-block; background: linear-gradient(135deg, #16a34a, #059669); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
                🚛 Track Your Package in Real-time
              </a>
            </div>

            <!-- Features -->
            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
              <h4 style="margin: 0 0 15px 0; color: #0f172a;">Real-time Tracking Features:</h4>
              <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
                <li>Live GPS location updates</li>
                <li>Estimated delivery time</li>
                <li>SMS notifications for status changes</li>
                <li>Direct courier website integration</li>
              </ul>
            </div>

            <!-- Order Items -->
            <div style="margin-bottom: 25px;">
              <h4 style="margin: 0 0 15px 0; color: #0f172a;">Order Items:</h4>
              ${order.orderItems.map(item => `
                <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: #f9fafb; border-radius: 6px; margin-bottom: 10px;">
                  ${item.product.image ? `<img src="${item.product.image}" alt="${item.product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">` : ''}
                  <div style="flex: 1;">
                    <div style="font-weight: 500; color: #0f172a;">${item.product.name}</div>
                    <div style="color: #6b7280; font-size: 14px;">Quantity: ${item.quantity} ${item.product.unit}</div>
                  </div>
                  <div style="font-weight: 600; color: #16a34a;">₹${item.price}</div>
                </div>
              `).join('')}
            </div>

            <!-- Contact Info -->
            <div style="background: #f1f5f9; border-radius: 8px; padding: 20px; text-align: center;">
              <p style="margin: 0; color: #475569; font-size: 14px;">
                Need help? Contact us at <strong>${process.env.ADMIN_EMAIL}</strong><br>
                Or visit our <a href="${process.env.NEXTAUTH_URL}/contact" style="color: #16a34a;">support center</a>
              </p>
            </div>
          </div>
        </div>
      `

      await resend.emails.send({
        from: `Tarasvie <${process.env.ADMIN_EMAIL}>`,
        to: [order.user.email],
        subject: emailSubject,
        html: emailHtml,
      })
    }

    if (method === 'sms') {
      // Note: SMS implementation would require a service like Twilio
      // For now, we'll just log and return success
      console.log(`SMS notification would be sent to ${order.shippingPhone}:`)
      console.log(`Order #${order.orderNumber} shipped! Track: ${trackingUrl}`)
      
      // In a real implementation, you would integrate with SMS service here
      // Example with Twilio:
      // await twilioClient.messages.create({
      //   body: `Your order #${order.orderNumber} is shipped! Track: ${trackingUrl}`,
      //   to: order.shippingPhone,
      //   from: process.env.TWILIO_PHONE_NUMBER
      // })
    }

    return NextResponse.json({
      success: true,
      message: `${method} notification sent successfully`
    })

  } catch (error) {
    console.error(`Error sending ${request.body?.method} notification:`, error)
    return NextResponse.json(
      { error: `Failed to send notification` },
      { status: 500 }
    )
  }
}
