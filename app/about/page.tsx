import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Users, Award, Heart, MapPin, Calendar } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Rajesh Tarasv",
      role: "Founder & Head Farmer",
      image: "/placeholder.svg?height=200&width=200",
      description: "30+ years of organic farming experience in Himachal Pradesh",
    },
    {
      name: "Priya Tarasv",
      role: "Quality Control Manager",
      image: "/placeholder.svg?height=200&width=200",
      description: "Ensures every product meets our highest organic standards",
    },
    {
      name: "Dr. Amit Kumar",
      role: "Agricultural Scientist",
      image: "/placeholder.svg?height=200&width=200",
      description: "PhD in Organic Agriculture, leads our research initiatives",
    },
    {
      name: "Sunita Devi",
      role: "Essential Oils Specialist",
      image: "/placeholder.svg?height=200&width=200",
      description: "Expert in traditional extraction methods and aromatherapy",
    },
  ]

  const milestones = [
    { year: "1995", event: "Started organic farming with 2 acres of apple orchard" },
    { year: "2005", event: "Received organic certification from NPOP" },
    { year: "2010", event: "Expanded to essential oil production" },
    { year: "2015", event: "Launched direct-to-consumer sales" },
    { year: "2020", event: "Started orchard stay experiences" },
    { year: "2024", event: "Launched TOFA online platform" },
  ]

  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About TOFA</h1>
            <p className="text-xl mb-8">
              Three decades of passion for organic farming, sustainable agriculture, and bringing nature's best directly
              to your table.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">30+</div>
                <div>Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div>Organic Certified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div>Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  TOFA (Tarasv Organic Farms & Aromatics) began as a small family farm in the pristine valleys of
                  Himachal Pradesh in 1995. What started with just 2 acres of apple orchard has grown into a thriving
                  organic farm spanning over 50 acres.
                </p>
                <p>
                  Our founder, Rajesh Tarasv, was inspired by his grandfather's traditional farming methods and decided
                  to combine ancient wisdom with modern organic practices. Today, we're proud to be one of the leading
                  organic farms in North India.
                </p>
                <p>
                  We believe that healthy soil produces healthy food, which leads to healthy people and a healthy
                  planet. This philosophy drives everything we do, from the way we nurture our crops to how we package
                  and deliver our products.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="TOFA Farm"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-900 text-center mb-12">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-green-200">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We practice regenerative agriculture that improves soil health and biodiversity.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Health First</h3>
                <p className="text-gray-600">
                  Every product is grown and processed with your health and wellbeing in mind.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-gray-600">
                  We support local farmers and contribute to the economic growth of our region.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality</h3>
                <p className="text-gray-600">
                  We maintain the highest standards from farm to table, ensuring premium quality.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Know Your Farmer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-900 text-center mb-12">Know Your Farmer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge className="mb-3 bg-green-100 text-green-800">{member.role}</Badge>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Journey */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-900 text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-green-100 text-green-800">{milestone.year}</Badge>
                    </div>
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section>
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-center justify-center">
                <MapPin className="h-6 w-6 text-green-600" />
                <span>Visit Our Farm</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Located in the beautiful apple belt of Himachal Pradesh, our farm is open for visits and orchard stay
                experiences.
              </p>
              <div className="space-y-2">
                <p className="font-medium">TOFA Organic Farms</p>
                <p className="text-gray-600">
                  Village Kotgarh, Shimla District
                  <br />
                  Himachal Pradesh 171201, India
                </p>
              </div>
              <div className="mt-6">
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Interactive Farm Location Map</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
