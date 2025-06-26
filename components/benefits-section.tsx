import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Recycle, Truck } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Chemical-Free",
      description: "No pesticides, herbicides, or synthetic fertilizers used in our farming process.",
    },
    {
      icon: Zap,
      title: "Nutrient Dense",
      description: "Higher levels of vitamins, minerals, and antioxidants compared to conventional produce.",
    },
    {
      icon: Recycle,
      title: "Sustainable",
      description: "Environmentally friendly farming practices that protect soil and water resources.",
    },
    {
      icon: Truck,
      title: "Fresh Delivery",
      description: "Direct from farm to your doorstep, ensuring maximum freshness and quality.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">Benefits of Organic</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choosing organic isn't just better for you - it's better for the environment, the farmers, and future
            generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <benefit.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
