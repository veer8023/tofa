"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"

export interface Product {
  id: string
  name: string
  price: number
  wholesalePrice?: number
  image: string
  category: "FRUITS" | "AROMATICS"
  description: string
  availability: "in-stock" | "out-of-stock" | "limited"
  unit: string
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
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
      setError(null)
      try {
        const response = await fetch("/api/products")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        const transformedProducts = data.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          wholesalePrice: product.wholesalePrice,
          image: product.image || "/placeholder.svg?height=300&width=300",
          category: product.category, // Keep original case
          description: product.description,
          availability: product.stock > 0 ? "in-stock" : "out-of-stock",
          unit: product.unit,
        }))
        setProducts(transformedProducts)
      } catch (error) {
        console.error("Failed to fetch products:", error)
        setError("Failed to load products. Please try again later.")
        setProducts([]) // Don't use fallback products with invalid IDs
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    if (filters.category !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === filters.category)
    }

    if (filters.availability !== "all") {
      filtered = filtered.filter((product) => product.availability === filters.availability)
    }

    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filtered = filtered.filter((product) => {
        if (max) {
          return product.price >= min && product.price <= max
        }
        return product.price >= min
      })
    }

    setFilteredProducts(filtered)
  }, [products, filters])

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto"></div>
                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-emerald-200 border-r-emerald-600 mx-auto animate-spin animate-reverse" style={{ animationDuration: '3s' }}></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Our Premium Collection</h3>
              <p className="text-gray-600">Fetching the finest organic products just for you...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-200/20 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-red-100 max-w-md mx-auto">
                <div className="text-6xl mb-6">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h3>
                <p className="text-red-600 mb-6 leading-relaxed">{error}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 shadow-lg"
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = "/contact"}
                    className="hover:bg-red-50 hover:border-red-300"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gray-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-slate-200/20 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-gray-100 max-w-md mx-auto">
                <div className="text-6xl mb-6">📦</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Products Available</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We're currently updating our inventory. Please check back soon for our amazing organic products!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                  >
                    Refresh Page
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = "/contact"}
                    className="hover:bg-green-50 hover:border-green-300"
                  >
                    Notify Me
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Enhanced floating decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-teal-200/15 rounded-full blur-xl animate-pulse delay-500"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
        {/* Premium Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-700 font-medium text-sm">100% Organic & Certified</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent leading-tight">
            Nature's Finest Collection
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the pure essence of Himalayan agriculture with our premium organic fruits 
            and therapeutic essential oils, cultivated with ancient wisdom and modern care.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 font-medium">Farm Fresh</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md border border-blue-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700 font-medium">Chemical Free</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md border border-orange-100">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700 font-medium">Direct from Farm</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Filter & Results Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-12 p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-green-100/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 flex-1">
            <h2 className="text-2xl font-bold text-green-900">
              {filteredProducts.length} Premium Products
            </h2>
            <div className="flex flex-wrap gap-2">
              {filters.category !== "all" && (
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}
                </span>
              )}
              {filters.availability !== "all" && (
                <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {filters.availability.replace("-", " ")}
                </span>
              )}
              {filters.priceRange !== "all" && (
                <span className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ₹{filters.priceRange}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden hover:bg-green-50 hover:border-green-300 shadow-md">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters & Sort
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-gradient-to-b from-white via-green-50/30 to-white">
                <ProductFilters filters={filters} onFiltersChange={handleFilterChange} />
              </SheetContent>
            </Sheet>
            
            {/* Quick filter buttons */}
            <div className="hidden lg:flex gap-2">
              <Button
                variant={filters.category === "fruits" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, category: filters.category === "fruits" ? "all" : "fruits" }))}
                className={filters.category === "fruits" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50"}
              >
                Fruits
              </Button>
              <Button
                variant={filters.category === "aromatics" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, category: filters.category === "aromatics" ? "all" : "aromatics" }))}
                className={filters.category === "aromatics" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50"}
              >
                Aromatics
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <ProductCard
                product={product}
                orderType={filters.orderType as "retail" | "wholesale"}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Empty State */}
        {filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-20">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border-2 border-green-100 max-w-lg mx-auto">
              <div className="text-8xl mb-6 animate-bounce">🌿</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No products match your search</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We couldn't find any products matching your current filters. 
                Try adjusting your search criteria or explore our full collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setFilters({
                    category: "all",
                    priceRange: "all",
                    orderType: "retail",
                    availability: "all",
                  })}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Clear All Filters
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/contact"}
                  className="hover:bg-green-50 hover:border-green-300"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
