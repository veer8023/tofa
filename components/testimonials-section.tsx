import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      text: "The apples from TOFA are incredibly fresh and sweet. You can really taste the difference organic makes!",
    },
    {
      name: "Rajesh Kumar",
      location: "Chandigarh",
      rating: 5,
      text: "Their lemongrass essential oil is pure and potent. Perfect for my aromatherapy practice.",
    },
    {
      name: "Meera Patel",
      location: "Punjab",
      rating: 5,
      text: "Fast delivery and excellent packaging. The fruits arrived in perfect condition.",
    },
    {
      name: "Amit Singh",
      location: "Haryana",
      rating: 5,
      text: "As a retailer, I'm impressed with their wholesale pricing and consistent quality.",
    },
  ]

  return (
    <section className="py-20 bg-green-50">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers across North India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-green-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
