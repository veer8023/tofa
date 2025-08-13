"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Filter, X, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  inStock: boolean
  rating: number
  reviews: number
  tags: string[]
  origin?: string
  organic?: boolean
  featured?: boolean
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Organic Red Apple",
    category: "fruits",
    price: 120,
    image: "/placeholder.jpg",
    description: "Fresh, crisp organic red apples from our orchards",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    tags: ["organic", "fresh", "vitamin-c"],
    origin: "Himachal Pradesh",
    organic: true,
    featured: true
  },
  {
    id: "2",
    name: "Lemongrass Essential Oil",
    category: "aromatics",
    price: 299,
    image: "/placeholder.jpg",
    description: "Pure therapeutic grade lemongrass essential oil",
    inStock: true,
    rating: 4.9,
    reviews: 89,
    tags: ["essential-oil", "aromatherapy", "natural"],
    origin: "Himachal Pradesh",
    organic: true,
    featured: true
  },
  {
    id: "3",
    name: "Organic Pears",
    category: "fruits",
    price: 150,
    image: "/placeholder.jpg",
    description: "Juicy organic pears, perfect for healthy snacking",
    inStock: true,
    rating: 4.7,
    reviews: 67,
    tags: ["organic", "fresh", "fiber"],
    origin: "Himachal Pradesh",
    organic: true
  },
  {
    id: "4",
    name: "Blueberry Pack",
    category: "fruits",
    price: 399,
    image: "/placeholder.jpg",
    description: "Antioxidant-rich organic blueberries",
    inStock: false,
    rating: 4.9,
    reviews: 156,
    tags: ["organic", "antioxidants", "superfood"],
    origin: "Himachal Pradesh",
    organic: true,
    featured: true
  },
  {
    id: "5",
    name: "Lavender Essential Oil",
    category: "aromatics",
    price: 399,
    image: "/placeholder.jpg",
    description: "Calming lavender oil for relaxation and sleep",
    inStock: true,
    rating: 4.8,
    reviews: 203,
    tags: ["essential-oil", "relaxation", "sleep"],
    origin: "Himachal Pradesh",
    organic: true
  },
  {
    id: "6",
    name: "Organic Guava",
    category: "fruits",
    price: 89,
    image: "/placeholder.jpg",
    description: "Sweet and nutritious organic guava",
    inStock: true,
    rating: 4.6,
    reviews: 45,
    tags: ["organic", "vitamin-c", "tropical"],
    origin: "Himachal Pradesh",
    organic: true
  }
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
    inStock: false,
    organic: false,
    rating: 0,
    tags: [] as string[],
    sortBy: "name"
  })
  const [showFilters, setShowFilters] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(INITIAL_PRODUCTS)
      setFilteredProducts(INITIAL_PRODUCTS)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock)
    }

    if (filters.organic) {
      filtered = filtered.filter(p => p.organic)
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.rating)
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(p => 
        filters.tags.some(tag => p.tags.includes(tag))
      )
    }

    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Apply sorting
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(filtered)
  }, [products, filters])

  const clearFilters = () => {
    setFilters({
      category: "",
      priceRange: [0, 1000],
      inStock: false,
      organic: false,
      rating: 0,
      tags: [],
      sortBy: "name"
    })
    toast({
      title: "Filters cleared",
      description: "All filters have been reset"
    })
  }

  const activeFiltersCount = () => {
    let count = 0
    if (filters.category) count++
    if (filters.inStock) count++
    if (filters.organic) count++
    if (filters.rating > 0) count++
    if (filters.tags.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++
    return count
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
          <p className="text-lg text-gray-600">Loading our finest organic products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-200/20 rounded-full blur-xl"></div>
      
      <div className="container py-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-800 bg-clip-text text-transparent">
              Our Products
            </h1>
            <Sparkles className="h-8 w-8 text-emerald-600" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked collection of premium organic fruits and therapeutic essential oils, 
            grown and crafted with care in the pristine valleys of Himachal Pradesh.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 hover:bg-green-50 hover:border-green-300"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount() > 0 && (
                <Badge className="bg-green-500 text-white">
                  {activeFiltersCount()}
                </Badge>
              )}
            </Button>
            
            {activeFiltersCount() > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-600"
              >
                <X className="h-4 w-4" />
                <span>Clear all</span>
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </span>
            
            <select 
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({...prev, sortBy: e.target.value}))}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-24">
                <ProductFilters filters={filters} setFilters={setFilters} />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-green-100 max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search criteria to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
