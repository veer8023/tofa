import { type NextRequest, NextResponse } from "next/server"

// Mock order data
const MOCK_ORDER = {
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
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    return NextResponse.json({ ...MOCK_ORDER, id: params.id })
  } catch (error) {
    console.error("Order fetch error:", error)
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()

    const updatedOrder = {
      ...MOCK_ORDER,
      ...updates,
      id: params.id,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("Order update error:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
