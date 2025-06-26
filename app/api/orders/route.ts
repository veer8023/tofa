import { type NextRequest, NextResponse } from "next/server"

// Mock orders data
const MOCK_ORDERS = [
  {
    id: "order-1",
    orderNumber: "ORD-001",
    userId: "user-1",
    status: "DELIVERED",
    total: 1250,
    shippingAddress: {
      street: "123 Main St",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      phone: "9876543210",
    },
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        quantity: 5,
        price: 120,
        product: {
          name: "Organic Apple",
          unit: "per kg",
        },
      },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      name: "John Doe",
      email: "john@example.com",
    },
  },
  {
    id: "order-2",
    orderNumber: "ORD-002",
    userId: "user-2",
    status: "PROCESSING",
    total: 850,
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "9876543211",
    },
    items: [
      {
        id: "item-2",
        productId: "prod-2",
        quantity: 2,
        price: 425,
        product: {
          name: "Lemongrass Oil",
          unit: "per 50ml",
        },
      },
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      name: "Sarah Smith",
      email: "sarah@example.com",
    },
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")

    let orders = [...MOCK_ORDERS]

    if (status) {
      orders = orders.filter((order) => order.status.toLowerCase() === status.toLowerCase())
    }

    if (userId) {
      orders = orders.filter((order) => order.userId === userId)
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const newOrder = {
      id: `order-${Date.now()}`,
      orderNumber: `ORD-${String(Date.now()).slice(-6)}`,
      ...orderData,
      status: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
