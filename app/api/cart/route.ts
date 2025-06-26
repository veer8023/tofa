import { type NextRequest, NextResponse } from "next/server"

// Mock cart data (in real app, this would be stored in database or session)
let MOCK_CART_ITEMS: any[] = []

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(MOCK_CART_ITEMS)
  } catch (error) {
    console.error("Cart fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { productId, quantity = 1 } = await request.json()

    // Check if item already exists in cart
    const existingItemIndex = MOCK_CART_ITEMS.findIndex((item) => item.productId === productId)

    if (existingItemIndex >= 0) {
      // Update quantity
      MOCK_CART_ITEMS[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      const newItem = {
        id: `cart-${Date.now()}`,
        productId,
        quantity,
        addedAt: new Date().toISOString(),
      }
      MOCK_CART_ITEMS.push(newItem)
    }

    return NextResponse.json({ message: "Item added to cart", items: MOCK_CART_ITEMS })
  } catch (error) {
    console.error("Add to cart error:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    MOCK_CART_ITEMS = []
    return NextResponse.json({ message: "Cart cleared" })
  } catch (error) {
    console.error("Clear cart error:", error)
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 })
  }
}
