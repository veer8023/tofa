import { NextRequest, NextResponse } from "next/server"
import { prisma, withRetry } from "@/lib/prisma"
import { cartItemSchema } from "@/lib/validation"
import { handleApiError, validationError, notFoundError } from "@/lib/error-handler"
import { log } from "@/lib/logger"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    
    if (!userId) {
      throw validationError("Missing userId")
    }

    const cartItems = await withRetry(async () => {
      return await prisma.cartItem.findMany({
        where: { userId },
        include: { product: true }
      })
    })

    // Map the cart items to include product fields at the top level
    const items = cartItems.map(item => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      name: item.product?.name ?? "Unknown Product",
      price: item.product?.price ?? 0,
      image: item.product?.image ?? "",
      category: item.product?.category ?? "FRUITS",
      orderType: item.orderType ?? "RETAIL"
    }))

    log.info('Cart items fetched successfully', { userId, count: items.length })
    return NextResponse.json({ items })

  } catch (error) {
    log.apiError('/api/cart', error)
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = cartItemSchema.parse(body)
    const { userId, productId, quantity, orderType = "RETAIL" } = validatedData

    // Check if user exists
    const user = await withRetry(async () => {
      return await prisma.user.findUnique({
        where: { id: userId }
      })
    })

    if (!user) {
      throw notFoundError("User not found")
    }

    // Check if product exists
    const product = await withRetry(async () => {
      return await prisma.product.findUnique({
        where: { id: productId }
      })
    })

    if (!product) {
      throw notFoundError("Product not found")
    }

    // Check if product is active
    if (product.status !== "ACTIVE") {
      throw validationError("Product is not available")
    }

    // Check if enough stock is available
    if (product.stock < quantity) {
      throw validationError(`Only ${product.stock} items available in stock`)
    }

    // Create or update cart item
    const cartItem = await withRetry(async () => {
      return await prisma.cartItem.upsert({
        where: {
          userId_productId: { userId, productId }
        },
        update: {
          quantity: { increment: quantity },
          orderType
        },
        create: {
          userId,
          productId,
          quantity,
          orderType
        },
        include: {
          product: true
        }
      })
    })

    log.info('Item added to cart successfully', { 
      userId, 
      productId, 
      quantity, 
      orderType 
    })

    return NextResponse.json({ 
      item: cartItem,
      message: "Item added to cart successfully"
    })

  } catch (error) {
    log.apiError('/api/cart', error)
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const itemId = searchParams.get("itemId")

    if (!userId) {
      throw validationError("Missing userId")
    }

    if (itemId) {
      // Delete specific item
      const deletedItem = await withRetry(async () => {
        return await prisma.cartItem.deleteMany({
          where: { 
            id: itemId,
            userId 
          }
        })
      })

      log.info('Cart item deleted successfully', { userId, itemId })
      return NextResponse.json({ 
        message: "Item removed from cart",
        deletedCount: deletedItem.count
      })
    } else {
      // Clear entire cart
      const deletedItems = await withRetry(async () => {
        return await prisma.cartItem.deleteMany({
          where: { userId }
        })
      })

      log.info('Cart cleared successfully', { userId, deletedCount: deletedItems.count })
      return NextResponse.json({ 
        message: "Cart cleared successfully",
        deletedCount: deletedItems.count
      })
    }

  } catch (error) {
    log.apiError('/api/cart', error)
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, productId, quantity } = body

    if (!userId || !productId || quantity === undefined) {
      throw validationError("Missing required fields: userId, productId, quantity")
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await withRetry(async () => {
        return await prisma.cartItem.deleteMany({
          where: { userId, productId }
        })
      })

      log.info('Cart item removed due to zero quantity', { userId, productId })
      return NextResponse.json({ 
        message: "Item removed from cart",
        quantity: 0
      })
    }

    // Update quantity
    const updatedItem = await withRetry(async () => {
      return await prisma.cartItem.update({
        where: { userId_productId: { userId, productId } },
        data: { quantity },
        include: { product: true }
      })
    })

    log.info('Cart item quantity updated', { userId, productId, quantity })
    return NextResponse.json({ 
      item: updatedItem,
      message: "Quantity updated successfully"
    })

  } catch (error) {
    log.apiError('/api/cart', error)
    return handleApiError(error)
  }
}


