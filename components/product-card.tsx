"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/app/products/page"

interface ProductCardProps {
  product: Product
  orderType: "retail" | "wholesale"
}

export function ProductCard({ product, orderType }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const price = orderType === "wholesale" ? product.wholesalePrice : product.price
  const isOutOfStock = product.availability === "out-of-stock"

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price,
      image: product.image,
      category: product.category,
      orderType,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const getAvailabilityBadge = () => {
    switch (product.availability) {
      case "in-stock":
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
      case "limited":
        return <Badge className="bg-yellow-100 text-yellow-800">Limited Stock</Badge>
      case "out-of-stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">{getAvailabilityBadge()}</div>
        {orderType === "wholesale" && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-blue-100 text-blue-800">Wholesale</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-green-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-600">₹{price}</span>
            <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
          </div>
          {orderType === "retail" && product.wholesalePrice < product.price && (
            <div className="text-xs text-gray-500">Wholesale: ₹{product.wholesalePrice}</div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button onClick={handleAddToCart} disabled={isOutOfStock} className="flex-1 bg-green-600 hover:bg-green-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button variant="outline" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
