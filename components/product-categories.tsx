import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Apple, Droplets, ArrowRight } from "lucide-react"

export function ProductCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Our Products
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Premium organic products, carefully cultivated for your health and wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Apple className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Organic Fruits
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Fresh, nutrient-packed fruits including apples, pears, blueberries, and more.
              </p>
              <Link href="/products?category=fruits">
                <Button variant="outline" className="group">
                  Shop Fruits
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplets className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Essential Oils
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Pure, therapeutic-grade essential oils for aromatherapy and wellness.
              </p>
              <Link href="/products?category=aromatics">
                <Button variant="outline" className="group">
                  Shop Oils
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
