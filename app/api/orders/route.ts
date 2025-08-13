import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { log } from "@/lib/logger"
import { sendOrderNotificationToAdmin, type OrderEmailData } from "@/lib/email"

// GET all orders (for admin) or user's orders
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const isAdmin = session.user.role === "ADMIN"
    const status = searchParams.get("status")
    const orderNumber = searchParams.get("orderNumber")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build where clause
    let where: any = {}
    
    if (!isAdmin) {
      // Regular users can only see their own orders
      where.userId = session.user.id
    }
    
    if (status && status !== "all") {
      where.status = status.toUpperCase()
    }

    // If searching by order number, add it to the where clause
    if (orderNumber) {
      where.orderNumber = orderNumber
    }

    // Fetch orders with related data
    const orders = await prisma.order.findMany({
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
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    })

    // Get total count for pagination
    const total = await prisma.order.count({ where })

    log.userAction(session.user.id, 'orders_fetched', { 
      isAdmin, 
      count: orders.length, 
      status, 
      page 
    })

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    console.log("Received order data:", JSON.stringify(body, null, 2))
    
    const {
      items,
      shippingAddress,
      paymentMethod,
      orderType = "RETAIL",
      notes = ""
    } = body

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log("Order validation failed: Invalid items array", { items })
      return NextResponse.json(
        { error: "Order items are required" },
        { status: 400 }
      )
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone) {
      console.log("Order validation failed: Invalid shipping address", { shippingAddress })
      return NextResponse.json(
        { error: "Complete shipping address is required" },
        { status: 400 }
      )
    }

    // Generate unique order number
    const orderNumber = `TOFA${Date.now()}`

    // Calculate totals
    let subtotal = 0
    const validatedItems = []

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      })

      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 400 }
        )
      }

      const price = orderType === "WHOLESALE" ? product.wholesalePrice : product.price
      const itemTotal = price * item.quantity
      subtotal += itemTotal

      validatedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price,
        orderType: orderType as "RETAIL" | "WHOLESALE"
      })
    }

    const shippingCost = subtotal > 500 ? 0 : 50 // Free shipping over ₹500
    const tax = Math.round(subtotal * 0.18) // 18% GST
    const total = subtotal + shippingCost + tax

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        status: "PENDING",
        paymentMethod: paymentMethod?.toUpperCase() || "COD",
        paymentStatus: paymentMethod === "cod" ? "PENDING" : "PENDING",
        subtotal,
        shippingCost,
        tax,
        total,
        shippingName: shippingAddress.fullName,
        shippingPhone: shippingAddress.phone,
        shippingAddress: `${shippingAddress.addressLine1}, ${shippingAddress.addressLine2 || ''}`,
        shippingCity: shippingAddress.city,
        shippingState: shippingAddress.state,
        shippingPincode: shippingAddress.pincode,
        orderItems: {
          create: validatedItems
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    // Log order creation
    log.userAction(session.user.id, 'order_created', {
      orderId: order.id,
      orderNumber: order.orderNumber,
      total: order.total,
      itemCount: validatedItems.length,
      paymentMethod: order.paymentMethod
    })

    // Send email notification to admin
    try {
      const emailData: OrderEmailData = {
        orderNumber: order.orderNumber,
        customerName: order.user.name || 'Unknown Customer',
        customerEmail: order.user.email || 'unknown@email.com',
        customerPhone: order.shippingPhone,
        items: order.orderItems.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        tax: order.tax,
        total: order.total,
        shippingAddress: `${order.shippingName}, ${order.shippingAddress}, ${order.shippingCity}, ${order.shippingState} - ${order.shippingPincode}`,
        paymentMethod: order.paymentMethod,
        orderDate: new Date(order.createdAt).toLocaleString('en-IN', { 
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      const emailResult = await sendOrderNotificationToAdmin(emailData)
      
      if (emailResult.success) {
        console.log("✅ Admin notification email sent successfully")
        log.userAction(session.user.id, 'admin_email_sent', {
          orderId: order.id,
          emailId: emailResult.emailId
        })
      } else {
        console.warn("⚠️ Failed to send admin notification email:", emailResult.error)
        log.authError(session.user.id, 'admin_email_failed', emailResult.error || 'Unknown error')
      }
    } catch (emailError) {
      console.error("❌ Error in email notification process:", emailError)
      log.authError(session.user.id, 'admin_notification_error', `${emailError}`)
    }

    // Clear user's cart after successful order
    try {
      await prisma.cartItem.deleteMany({
        where: { userId: session.user.id }
      })
      console.log("🧹 User cart cleared after order creation")
    } catch (cartError) {
      console.warn("⚠️ Failed to clear user cart:", cartError)
      // Don't fail the order for cart clearing issues
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating order:", error)
    log.authError('unknown', 'order_creation_failed', `${error}`)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
