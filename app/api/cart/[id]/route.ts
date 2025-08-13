import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    await prisma.cartItem.delete({ where: { id } })
    return NextResponse.json({ message: "Item removed from cart" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 })
  }
}
