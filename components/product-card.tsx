"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/app/products/page"

interface ProductCardProps {
  product: Product
  orderType: "retail" | "wholesale"
}

export function ProductCard({ product, orderType }: ProductCardProps) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()

  const price = orderType === "wholesale" ? (product.wholesalePrice || product.price) : product.price
  const isOutOfStock = product.availability === "out-of-stock"

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to cart.",
        variant: "destructive",
      })
      // Redirect to login page
      window.location.href = "/auth/login"
      return
    }

    try {
      await addItem(product.id, 1)
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      console.error("Failed to add item to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    }
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

  const getCategoryBadge = () => {
    const categoryName = product.category === "FRUITS" ? "Fruits" : "Aromatics"
    return (
      <Badge className="bg-blue-100 text-blue-800">
        {categoryName}
      </Badge>
    )
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
        <div className="absolute top-2 left-2 flex gap-1">
          {getCategoryBadge()}
          {orderType === "wholesale" && (
            <Badge className="bg-purple-100 text-purple-800">Wholesale</Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-green-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-600">₹{price}</span>
            <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
          </div>
          {orderType === "retail" && product.wholesalePrice && product.wholesalePrice < product.price && (
            <div className="text-xs text-gray-500">Wholesale: ₹{product.wholesalePrice}</div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          onClick={handleAddToCart} 
          disabled={isOutOfStock} 
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          🛒 {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button className="border border-gray-300 bg-white hover:bg-gray-50 px-3">
          👁️
        </Button>
      </CardFooter>
    </Card>
  )
}
