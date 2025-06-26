import { type NextRequest, NextResponse } from "next/server"

// Mock product for demo
const MOCK_PRODUCT = {
  id: "prod-1",
  name: "Organic Apple",
  description: "Fresh organic apples from Himachal Pradesh",
  category: "FRUITS",
  price: 120,
  wholesalePrice: 100,
  stock: 50,
  minStock: 10,
  unit: "per kg",
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Return mock product data
    return NextResponse.json({ ...MOCK_PRODUCT, id: params.id })
  } catch (error) {
    console.error("Product fetch error:", error)
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()

    // Return updated mock product
    const updatedProduct = {
      ...MOCK_PRODUCT,
      ...updates,
      id: params.id,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("Product update error:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Return success for demo
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Product delete error:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
