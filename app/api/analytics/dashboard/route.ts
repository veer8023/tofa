import { NextResponse } from "next/server"

// Mock analytics data
const MOCK_ANALYTICS = {
  revenue: {
    total: 125000,
    growth: 15.5,
    thisMonth: 18500,
    lastMonth: 16000,
  },
  orders: {
    total: 450,
    pending: 12,
    processing: 8,
    shipped: 15,
    delivered: 415,
    growth: 8.2,
  },
  users: {
    total: 1250,
    newThisMonth: 85,
    growth: 12.3,
    customers: 1100,
    retailers: 120,
    wholesalers: 30,
  },
  products: {
    total: 18,
    lowStock: 3,
    outOfStock: 0,
    categories: {
      fruits: 8,
      aromatics: 5,
      oils: 3,
      herbs: 2,
    },
  },
  recentOrders: [
    {
      id: "order-1",
      customerName: "John Doe",
      total: 1250,
      status: "delivered",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "order-2",
      customerName: "Sarah Smith",
      total: 850,
      status: "shipped",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ],
  lowStockProducts: [
    {
      id: "prod-1",
      name: "Organic Apple",
      stock: 8,
      minStock: 10,
    },
    {
      id: "prod-2",
      name: "Lemongrass Oil",
      stock: 3,
      minStock: 5,
    },
  ],
}

export async function GET() {
  try {
    return NextResponse.json(MOCK_ANALYTICS)
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
