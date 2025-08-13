import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Heart, Users, Award, Mountain, Droplets, Sun, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function AboutSection() {
  const features = [
    {
      icon: Leaf,
      title: "100% Organic",
      description: "Certified organic farming practices with no harmful chemicals or pesticides.",
      gradient: "from-green-400 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      stat: "30+ Years"
    },
    {
      icon: Heart,
      title: "Health First",
      description: "Nutrient-rich fruits and therapeutic essential oils for your wellbeing.",
      gradient: "from-pink-400 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50",
      stat: "100% Natural"
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Supporting local farmers and sustainable agricultural practices.",
      gradient: "from-blue-400 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      stat: "1000+ Families"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Rigorous quality control and freshness guaranteed from farm to table.",
      gradient: "from-amber-400 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      stat: "99% Satisfaction"
    }
  ]

  const highlights = [
    {
      icon: Mountain,
      title: "Himalayan Heights",
      description: "Grown at 2000+ feet elevation in pristine mountain air",
      value: "2000+ ft"
    },
    {
      icon: Droplets,
      title: "Pure Waters",
      description: "Natural spring water irrigation for optimal growth",
      value: "100% Pure"
    },
    {
      icon: Sun,
      title: "Perfect Climate",
      description: "Ideal temperature and humidity for organic cultivation",
      value: "300+ Days"
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-emerald-50/30"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-1/4 w-40 h-40 bg-green-200/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-blue-200/10 rounded-full blur-2xl"></div>
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Central Hero Content */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <Leaf className="w-4 h-4" />
            Organic Since 1995
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            About <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">TOFA</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Founded with a passion for sustainable farming and natural wellness, TOFA brings you the finest organic
            produce and essential oils from the pristine valleys of <strong>Himachal Pradesh</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/about">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                Our Complete Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/orchard-stay">
              <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
                Visit Our Farm
              </Button>
            </Link>
          </div>
        </div>

        {/* Farm Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {highlights.map((highlight, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <highlight.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{highlight.value}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{highlight.title}</h3>
                <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Story Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full mb-6 text-sm font-medium">
              <Mountain className="w-4 h-4" />
              Our Mountain Story
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              From Himalayan Soil to <span className="text-green-600">Your Table</span>
            </h3>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Nestled in the breathtaking landscapes of Himachal Pradesh, our organic farms benefit from pristine mountain air, 
              pure water sources, and rich soil. Every fruit we grow and every oil we extract carries the essence of these 
              majestic mountains, delivering not just nutrition but a connection to nature's purest form.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              For over <strong>30 years</strong>, we've perfected the art of organic farming, combining traditional wisdom 
              with modern sustainable practices to create products that nourish both body and soul.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
              <blockquote className="text-lg italic text-gray-700 mb-3">
                "Every fruit we grow carries the pure essence of the Himalayas - a gift from nature to your family."
              </blockquote>
              <cite className="text-green-700 font-semibold">— Veeresh, Founder</cite>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-600 rounded-3xl opacity-20 blur-lg"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="TOFA Organic Farm in Himachal Pradesh"
                width={500}
                height={400}
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg border-2 border-green-100">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Acres Organic</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose TOFA?</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence is reflected in every aspect of our farming and production process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 backdrop-blur-sm bg-gradient-to-br ${feature.bgGradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-8 space-y-4 relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{feature.stat}</div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h3>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
            Three decades of dedication to organic farming and sustainable practices have created lasting positive impact.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-green-200">Happy Families</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-green-200">Organic Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">30+</div>
              <div className="text-green-200">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-green-200">Chemical Free</div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
                Shop Our Products
              </Button>
            </Link>
            <Link href="/wholesale">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
                Wholesale Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
