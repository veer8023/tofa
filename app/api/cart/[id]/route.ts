import { type NextRequest, NextResponse } from "next/server"

// Mock cart data (shared with cart/route.ts)
const MOCK_CART_ITEMS: any[] = []

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { quantity } = await request.json()

    const itemIndex = MOCK_CART_ITEMS.findIndex((item) => item.id === params.id)

    if (itemIndex >= 0) {
      MOCK_CART_ITEMS[itemIndex].quantity = quantity
      return NextResponse.json({ message: "Cart item updated", item: MOCK_CART_ITEMS[itemIndex] })
    } else {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Update cart item error:", error)
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const itemIndex = MOCK_CART_ITEMS.findIndex((item) => item.id === params.id)

    if (itemIndex >= 0) {
      MOCK_CART_ITEMS.splice(itemIndex, 1)
      return NextResponse.json({ message: "Cart item removed" })
    } else {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Remove cart item error:", error)
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 })
  }
}
