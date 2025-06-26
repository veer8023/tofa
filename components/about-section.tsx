import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Heart, Users, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">About TOFA</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Founded with a passion for sustainable farming and natural wellness, TOFA brings you the finest organic
            produce and essential oils from the pristine valleys of Himachal Pradesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900">100% Organic</h3>
              <p className="text-gray-600">
                Certified organic farming practices with no harmful chemicals or pesticides.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900">Health First</h3>
              <p className="text-gray-600">Nutrient-rich fruits and therapeutic essential oils for your wellbeing.</p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900">Community Focus</h3>
              <p className="text-gray-600">Supporting local farmers and sustainable agricultural practices.</p>
            </CardContent>
          </Card>

          <Card className="text-center border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900">Quality Assured</h3>
              <p className="text-gray-600">Rigorous quality control and freshness guaranteed from farm to table.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
