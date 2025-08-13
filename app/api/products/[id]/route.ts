import { type NextRequest, NextResponse } from "next/server"
import { prisma, withRetry } from "@/lib/prisma"
import { productSchema } from "@/lib/validation"
import { handleApiError, validationError } from "@/lib/error-handler"
import { log } from "@/lib/logger"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await withRetry(async () => {
      return await prisma.product.findUnique({
        where: { id: params.id }
      })
    })

    if (!product) {
      throw validationError("Product not found")
    }

    log.info('Product fetched successfully', { productId: params.id })
    return NextResponse.json(product)
  } catch (error) {
    log.apiError(`/api/products/${params.id}`, error)
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    
    // Validate input
    const validatedData = productSchema.parse(data)

    // Check if product exists
    const existingProduct = await withRetry(async () => {
      return await prisma.product.findUnique({
        where: { id: params.id }
      })
    })

    if (!existingProduct) {
      throw validationError("Product not found")
    }

    // Update product
    const updatedProduct = await withRetry(async () => {
      return await prisma.product.update({
        where: { id: params.id },
        data: validatedData
      })
    })

    log.info('Product updated successfully', { productId: params.id, name: updatedProduct.name })
    return NextResponse.json(updatedProduct)
  } catch (error) {
    log.apiError(`/api/products/${params.id}`, error)
    return handleApiError(error)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if product exists
    const existingProduct = await withRetry(async () => {
      return await prisma.product.findUnique({
        where: { id: params.id }
      })
    })

    if (!existingProduct) {
      throw validationError("Product not found")
    }

    // Delete product
    await withRetry(async () => {
      return await prisma.product.delete({
        where: { id: params.id }
      })
    })

    log.info('Product deleted successfully', { productId: params.id })
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    log.apiError(`/api/products/${params.id}`, error)
    return handleApiError(error)
  }
}
