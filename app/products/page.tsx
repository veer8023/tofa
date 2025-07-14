"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export interface Product {
  id: string
  name: string
  price: number
  wholesalePrice: number
  image: string
  category: "fruits" | "aromatics" | "other"
  description: string
  availability: "in-stock" | "out-of-stock" | "limited"
  unit: string
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    priceRange: "all",
    orderType: "retail",
    availability: "all",
  })

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        const transformedProducts = data.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || "/placeholder.svg?height=300&width=300",
          category: product.category.toLowerCase(),
          description: product.description,
          availability: product.stock > 0 ? "in-stock" : "out-of-stock",
          unit: product.unit,
        }))
        setProducts(transformedProducts)
      } catch (error) {
        console.error("Failed to fetch products:", error)
        // Fallback to static products
        const fallbackProducts: Product[] = [
          {
            id: "1",
            name: "Organic Apple",
            price: 180,
            wholesalePrice: 150,
            image: "/placeholder.svg?height=300&width=300",
            category: "fruits",
            description: "Fresh, crisp organic apples from our Himachal orchards",
            availability: "in-stock",
            unit: "per kg",
          },
          {
            id: "2",
            name: "Lemongrass Essential Oil",
            price: 450,
            wholesalePrice: 380,
            image: "/placeholder.svg?height=300&width=300",
            category: "aromatics",
            description: "Pure lemongrass essential oil for aromatherapy",
            availability: "in-stock",
            unit: "per 50ml",
          },
        ]
        setProducts(fallbackProducts)
      }
      setLoading(false) // <-- Always reset loading state
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    if (filters.category !== "all") {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    if (filters.availability !== "all") {
      filtered = filtered.filter((product) => product.availability === filters.availability)
    }

    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filtered = filtered.filter((product) => {
        const price = filters.orderType === "wholesale" ? product.wholesalePrice : product.price
        return price >= min && price <= max
      })
    }

    setFilteredProducts(filtered)
  }, [filters, products])

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-900">Our Products</h1>
          <p className="text-gray-600 mt-2">Discover our range of organic fruits and essential oils</p>
        </div>

        {/* Mobile filter trigger */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop filters */}
        <div className="hidden lg:block">
          <ProductFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Products grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-gray-600">Showing {filteredProducts.length} products</div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} orderType={filters.orderType as "retail" | "wholesale"} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
