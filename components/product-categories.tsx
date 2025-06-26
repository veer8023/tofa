import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Apple, Droplets, ArrowRight } from "lucide-react"

export function ProductCategories() {
  return (
    <section className="py-20 bg-green-50">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">Our Product Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium organic products, carefully cultivated and processed to bring you nature's
            best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 bg-gradient-to-br from-red-100 to-yellow-100 flex items-center justify-center">
              <Apple className="h-24 w-24 text-red-500" />
            </div>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-green-900">Organic Fruits</h3>
              <p className="text-gray-600">
                Fresh, juicy, and nutrient-packed fruits including apples, pears, blueberries, guava, persimmon, and
                lemons - all grown organically in our orchards.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Apple</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Pear</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Blueberry</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Guava</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Persimmon</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Lemon</span>
              </div>
              <Link href="/products?category=fruits">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Shop Fruits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-64 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <Droplets className="h-24 w-24 text-purple-500" />
            </div>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-green-900">Essential Oils & Aromatics</h3>
              <p className="text-gray-600">
                Pure, therapeutic-grade essential oils extracted from our organic herbs and fruits. Perfect for
                aromatherapy, wellness, and natural skincare.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Lemongrass Oil</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Apricot Oil</span>
              </div>
              <Link href="/products?category=aromatics">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Shop Aromatics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
