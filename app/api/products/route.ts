import { NextRequest, NextResponse } from "next/server"
import { prisma, withRetry } from "@/lib/prisma"
import { productSchema, productSearchSchema } from "@/lib/validation"
import { handleApiError, validationError } from "@/lib/error-handler"
import { log } from "@/lib/logger"

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Use searchParams from the request object directly
    const searchParams = request.nextUrl.searchParams
    
    // Extract and validate search parameters
    const searchData = {
      category: searchParams.get("category"),
      search: searchParams.get("search"),
      page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : undefined,
      limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined,
    }

    // Validate search parameters
    const validatedSearch = productSearchSchema.parse(searchData)
    
    // Build query conditions
    const where: any = {}
    
    if (validatedSearch.category) {
      where.category = validatedSearch.category
    }
    
    if (validatedSearch.search) {
      where.OR = [
        { name: { contains: validatedSearch.search, mode: 'insensitive' } },
        { description: { contains: validatedSearch.search, mode: 'insensitive' } },
      ]
    }
    
    // Pagination
    const page = validatedSearch.page || 1
    const limit = validatedSearch.limit || 20
    const skip = (page - 1) * limit
    
    // Fetch products with pagination using retry logic
    const [products, total] = await withRetry(async () => {
      return await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.product.count({ where })
      ])
    })
    
    log.info('Products fetched successfully', { 
      count: products.length, 
      total, 
      page, 
      limit,
      filters: { category: validatedSearch.category, search: validatedSearch.search }
    })
    
    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      }
    })
    
  } catch (error) {
    log.apiError('/api/products', error)
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate input
    const validatedData = productSchema.parse(data)
    
    // Check if product with same name already exists
    const existingProduct = await withRetry(async () => {
      return await prisma.product.findFirst({
        where: { name: validatedData.name }
      })
    })
    
    if (existingProduct) {
      throw validationError("Product with this name already exists")
    }
    
    // Create product
    const product = await withRetry(async () => {
      return await prisma.product.create({
        data: validatedData
      })
    })
    
    log.info('Product created successfully', { productId: product.id, name: product.name })
    
    return NextResponse.json(product, { status: 201 })
    
  } catch (error) {
    log.apiError('/api/products', error)
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get("id")
    
    if (!productId) {
      throw validationError("Product ID is required")
    }
    
    // Check if product exists
    const existingProduct = await withRetry(async () => {
      return await prisma.product.findUnique({
        where: { id: productId }
      })
    })
    
    if (!existingProduct) {
      throw validationError("Product not found")
    }
    
    // Delete product
    await withRetry(async () => {
      return await prisma.product.delete({
        where: { id: productId }
      })
    })
    
    log.info('Product deleted successfully', { productId })
    
    return NextResponse.json({ message: "Product deleted successfully" })
    
  } catch (error) {
    log.apiError('/api/products', error)
    return handleApiError(error)
  }
}

