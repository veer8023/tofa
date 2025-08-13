import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { log } from "@/lib/logger"

// GET reviews for a product or user's reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
    const userId = searchParams.get("userId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    let where: any = { status: "APPROVED" }
    
    if (productId) {
      where.productId = productId
    }
    
    if (userId) {
      where.userId = userId
    }

    const reviews = await prisma.productReview.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, image: true }
        },
        product: {
          select: { id: true, name: true, image: true }
        }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    })

    const total = await prisma.productReview.count({ where })

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    )
  }
}

// POST - Create new review
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, productId, rating, title, comment } = body

    // Validate required fields
    if (!orderId || !productId || !rating) {
      return NextResponse.json(
        { error: "Order ID, Product ID, and rating are required" },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      )
    }

    // Verify order belongs to user and contains the product
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
        status: "DELIVERED"
      },
      include: {
        orderItems: {
          where: { productId }
        }
      }
    })

    if (!order || order.orderItems.length === 0) {
      return NextResponse.json(
        { error: "Invalid order or product not found in order" },
        { status: 400 }
      )
    }

    // Check if review already exists
    const existingReview = await prisma.productReview.findUnique({
      where: {
        userId_productId_orderId: {
          userId: session.user.id,
          productId,
          orderId
        }
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product for this order" },
        { status: 400 }
      )
    }

    // Create review
    const review = await prisma.productReview.create({
      data: {
        userId: session.user.id,
        productId,
        orderId,
        rating,
        title: title || null,
        comment: comment || null,
        isVerified: true,
        status: "PENDING"
      },
      include: {
        user: {
          select: { id: true, name: true, image: true }
        },
        product: {
          select: { id: true, name: true }
        }
      }
    })

    log.userAction(session.user.id, 'review_created', {
      reviewId: review.id,
      productId,
      orderId,
      rating
    })

    return NextResponse.json({
      success: true,
      review
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    )
  }
}
