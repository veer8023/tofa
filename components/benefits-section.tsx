import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Recycle, Truck, Leaf, Heart, Award, Users } from "lucide-react"
import Link from "next/link"

export function BenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: "100% Chemical-Free",
      description: "Zero pesticides, herbicides, or synthetic fertilizers. Pure, natural farming that preserves soil health and your family's wellbeing.",
      gradient: "from-emerald-400 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      stat: "0% Chemicals",
      feature: "Certified Organic"
    },
    {
      icon: Zap,
      title: "Superior Nutrition",
      description: "Up to 40% higher levels of vitamins, minerals, and antioxidants compared to conventional produce. Better taste, better health.",
      gradient: "from-amber-400 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      stat: "40% More",
      feature: "Nutrients & Vitamins"
    },
    {
      icon: Recycle,
      title: "Earth-Friendly",
      description: "Sustainable farming practices that regenerate soil, protect water resources, and support biodiversity for future generations.",
      gradient: "from-green-400 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      stat: "100% Sustainable",
      feature: "Regenerative Farming"
    },
    {
      icon: Truck,
      title: "Farm-Fresh Delivery",
      description: "Harvested at peak ripeness and delivered within 24-48 hours. Maximum freshness, flavor, and nutritional value guaranteed.",
      gradient: "from-blue-400 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      stat: "24-48 hrs",
      feature: "Farm to Table"
    },
  ]

  const additionalBenefits = [
    {
      icon: Heart,
      title: "Family Health",
      description: "Safe for children, pregnant mothers, and health-conscious families",
      color: "text-pink-600"
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description: "Reduces carbon footprint and supports biodiversity",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Supports local farmers and sustainable agriculture",
      color: "text-blue-600"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Rigorous testing and quality control at every step",
      color: "text-purple-600"
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white to-emerald-50/50"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-1/4 w-40 h-40 bg-green-200/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-emerald-200/10 rounded-full blur-2xl"></div>
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Central Hero Content */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <Leaf className="w-4 h-4" />
            Why Choose Organic?
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            The <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">Organic</span> Advantage
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Choosing organic isn't just a lifestyle choice - it's an investment in your health, your family's future, 
            and our planet's wellbeing. Discover the <strong>measurable benefits</strong> that make the difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/products">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                Shop Organic Products
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
                Learn Our Process
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Benefits Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className={`group text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 backdrop-blur-sm bg-gradient-to-br ${benefit.bgGradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-8 space-y-6 relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">{benefit.stat}</div>
                    <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                    <div className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block">
                      {benefit.feature}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">More Than Just Food</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              When you choose TOFA organic products, you're supporting a complete ecosystem of health, sustainability, and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalBenefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className={`w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 ${benefit.color}`}>
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 text-white text-center shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Proven Impact</h3>
          <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
            Real benefits backed by science and experienced by thousands of satisfied customers.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">40%</div>
              <div className="text-green-200">More Nutrients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">0%</div>
              <div className="text-green-200">Harmful Chemicals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">24hrs</div>
              <div className="text-green-200">Farm to Table</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
              <div className="text-green-200">Customer Satisfaction</div>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/products">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
                Experience the Difference
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
