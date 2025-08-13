import { Resend } from "resend"

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

export interface OrderEmailData {
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: Array<{
    name: string
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  shippingAddress: string
  paymentMethod: string
  orderDate: string
}

export async function sendOrderNotificationToAdmin(orderData: OrderEmailData) {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("⚠️ RESEND_API_KEY not configured. Email notification skipped.")
      return { success: false, error: "Email service not configured" }
    }

    if (!process.env.ADMIN_EMAIL) {
      console.warn("⚠️ ADMIN_EMAIL not configured. Using default admin@tofa.com")
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@tofa.com"

    const emailHtml = generateOrderEmailTemplate(orderData)

    const result = await resend.emails.send({
      from: "TOFA Orders <orders@tofa.com>",
      to: [adminEmail],
      subject: `🔔 New Order Received - ${orderData.orderNumber}`,
      html: emailHtml,
    })

    console.log("✅ Order notification email sent to admin:", result)
    return { success: true, emailId: result.data?.id }

  } catch (error) {
    console.error("❌ Failed to send order notification email:", error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

function generateOrderEmailTemplate(orderData: OrderEmailData): string {
  const itemsHtml = orderData.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.price.toFixed(2)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">₹${item.total.toFixed(2)}</td>
        </tr>
      `
    )
    .join("")

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Notification</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 30px 20px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 700;">🎉 New Order Received!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Order #${orderData.orderNumber}</p>
      </div>

      <!-- Content -->
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
        
        <!-- Order Summary -->
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="margin: 0 0 15px 0; color: #059669; font-size: 20px;">📋 Order Summary</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <strong>Order Date:</strong><br>
              <span style="color: #6b7280;">${orderData.orderDate}</span>
            </div>
            <div>
              <strong>Payment Method:</strong><br>
              <span style="color: #6b7280;">${orderData.paymentMethod}</span>
            </div>
          </div>
        </div>

        <!-- Customer Information -->
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="margin: 0 0 15px 0; color: #d97706; font-size: 20px;">👤 Customer Information</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <strong>Name:</strong><br>
              <span style="color: #6b7280;">${orderData.customerName}</span>
            </div>
            <div>
              <strong>Email:</strong><br>
              <span style="color: #6b7280;">${orderData.customerEmail}</span>
            </div>
            <div style="grid-column: span 2;">
              <strong>Phone:</strong><br>
              <span style="color: #6b7280;">${orderData.customerPhone}</span>
            </div>
            <div style="grid-column: span 2;">
              <strong>Shipping Address:</strong><br>
              <span style="color: #6b7280;">${orderData.shippingAddress}</span>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div style="margin-bottom: 25px;">
          <h2 style="margin: 0 0 15px 0; color: #059669; font-size: 20px;">🛒 Order Items</h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: #f9fafb;">
                <th style="padding: 15px 12px; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Product</th>
                <th style="padding: 15px 12px; text-align: center; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Qty</th>
                <th style="padding: 15px 12px; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Price</th>
                <th style="padding: 15px 12px; text-align: right; font-weight: 600; color: #374151; border-bottom: 1px solid #e5e7eb;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>

        <!-- Price Breakdown -->
        <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="margin: 0 0 15px 0; color: #2563eb; font-size: 20px;">💰 Price Breakdown</h2>
          <div style="space-y: 8px;">
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #cbd5e1;">
              <span>Subtotal:</span>
              <span>₹${orderData.subtotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #cbd5e1;">
              <span>Shipping:</span>
              <span>₹${orderData.shippingCost.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #cbd5e1;">
              <span>Tax (18% GST):</span>
              <span>₹${orderData.tax.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 12px 0; font-weight: 700; font-size: 18px; color: #059669; border-top: 2px solid #059669;">
              <span>Total Amount:</span>
              <span>₹${orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- Action Required -->
        <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="margin: 0 0 10px 0; color: #dc2626; font-size: 18px;">⚡ Action Required</h3>
          <ul style="margin: 10px 0; color: #6b7280; padding-left: 20px;">
            <li>Log in to admin dashboard to process this order</li>
            <li>Verify inventory for all items</li>
            <li>Contact customer if needed: ${orderData.customerPhone}</li>
            <li>Update order status as you process it</li>
          </ul>
        </div>

        <!-- Quick Actions -->
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.NEXTAUTH_URL}/admin/orders" 
             style="background: #059669; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; transition: background-color 0.3s;">
            🚀 View Order in Dashboard
          </a>
        </div>

      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          This is an automated notification from TOFA order management system.
        </p>
        <p style="margin: 5px 0 0 0; color: #9ca3af; font-size: 12px;">
          Generated on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </p>
      </div>

    </body>
    </html>
  `
}

// Alternative: Simple WhatsApp/SMS notification (requires WhatsApp Business API or SMS service)
export async function sendWhatsAppNotification(orderData: OrderEmailData) {
  // This is a placeholder for WhatsApp Business API integration
  // You would need to set up WhatsApp Business API or use a service like Twilio
  console.log("📱 WhatsApp notification placeholder - Order:", orderData.orderNumber)
  
  // Simple message format for WhatsApp
  const message = `
🎉 *NEW ORDER RECEIVED* 
📋 Order: ${orderData.orderNumber}
👤 Customer: ${orderData.customerName}
📞 Phone: ${orderData.customerPhone}
💰 Total: ₹${orderData.total}
🕒 Time: ${orderData.orderDate}

View in dashboard: ${process.env.NEXTAUTH_URL}/admin/orders
  `.trim()
  
  return { success: false, message: "WhatsApp API not configured", data: message }
}
