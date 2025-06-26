import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Apple, Droplets } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-20" />

      <div className="container relative z-10 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900">
            Welcome to <span className="text-green-600">TOFA</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-800 max-w-3xl mx-auto">
            Tarasv Organic Farms & Aromatics - Premium organic fruits and essential oils straight from our sustainable
            orchards in Himachal Pradesh
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/products?category=fruits">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              <Apple className="mr-2 h-5 w-5" />
              Shop Fruits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/products?category=aromatics">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              <Droplets className="mr-2 h-5 w-5" />
              Buy Aromatics
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/orchard-stay">
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              <Leaf className="mr-2 h-5 w-5" />
              Experience Our Orchards
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-600">100%</div>
            <div className="text-green-800">Organic Certified</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-600">5+</div>
            <div className="text-green-800">States Delivery</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-green-600">1000+</div>
            <div className="text-green-800">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  )
}
