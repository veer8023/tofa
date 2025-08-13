import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Apple, Droplets } from "lucide-react"

export function HeroSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      {/* Animated floating leaf background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Leaf className="w-[400px] h-[400px] text-green-100 opacity-30 animate-spin-slow" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg mx-auto px-4 py-12 space-y-10">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center group">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-400 shadow-lg mb-2 transition-transform group-hover:scale-110 animate-bounce-slow">
            <Leaf className="h-9 w-9 text-white" />
          </div>
          <span className="text-4xl font-extrabold text-green-800 tracking-tight drop-shadow-lg">Tarasvie</span>
        </Link>

        {/* Headline */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold text-green-900 transition-all duration-700 animate-fade-in-down">
            Premium Organic{" "}
            <span className="text-green-600">Fruits</span> &{" "}
            <span className="text-green-600">Aromatics</span>
          </h1>
          <p className="text-lg md:text-xl text-green-800 font-medium max-w-md mx-auto animate-fade-in-up">
            Sustainably grown in Himachal Pradesh. Direct from our orchards to your home.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 w-full items-center animate-fade-in-up">
          <Link href="/products?category=fruits" className="w-full">
            <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white shadow transition-transform duration-200 hover:scale-105">
              <Apple className="mr-2 h-5 w-5" />
              Shop Fruits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/products?category=aromatics" className="w-full">
            <Button
              size="lg"
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white shadow transition-transform duration-200 hover:scale-105"
            >
              <Droplets className="mr-2 h-5 w-5" />
              Buy Aromatics
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/orchard-stay" className="w-full">
            <Button
              size="lg"
              variant="ghost"
              className="w-full text-green-700 hover:bg-green-50 transition-transform duration-200 hover:scale-105"
            >
              <Leaf className="mr-2 h-5 w-5" />
              Experience Our Orchards
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Minimalist Stats */}
        <div className="flex justify-center gap-8 mt-8 animate-fade-in-up">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-green-800 text-xs">Organic Certified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">5+</div>
            <div className="text-green-800 text-xs">States Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1000+</div>
            <div className="text-green-800 text-xs">Happy Customers</div>
          </div>
        </div>
      </main>
    </div>
  )
}
