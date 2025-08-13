import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Users, Award, Heart, MapPin, Calendar, Mountain, Droplets, Sun, Shield } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Rajesh Thakur",
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

  const farmHighlights = [
    {
      icon: Mountain,
      title: "Mountain Fresh",
      description: "Grown at 2000+ feet elevation in pristine Himalayan foothills",
      stat: "2000+ ft"
    },
    {
      icon: Droplets,
      title: "Pure Water",
      description: "Irrigated with natural mountain spring water",
      stat: "100% Natural"
    },
    {
      icon: Sun,
      title: "Optimal Climate",
      description: "Perfect temperature and humidity for organic cultivation",
      stat: "300+ Sunny Days"
    },
    {
      icon: Shield,
      title: "Chemical Free",
      description: "Zero pesticides, herbicides, or synthetic fertilizers",
      stat: "0% Chemicals"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">Organic Since 1995</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              About <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">TOFA</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed max-w-4xl mx-auto">
              Three decades of passion for organic farming, sustainable agriculture, and bringing nature's best 
              directly from the majestic Himalayas to your table.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-4xl font-bold mb-2">30+</div>
                <div className="text-green-200">Years of Experience</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-green-200">Organic Certified</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-green-200">Happy Families</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 px-8 py-3">
                  Explore Our Products
                </Button>
              </Link>
              <Link href="/orchard-stay">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-3">
                  Visit Our Farm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Highlights - New Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Our Farm is Special</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Located in the pristine Himalayan foothills, our farm benefits from unique natural advantages 
              that make our organic produce exceptional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {farmHighlights.map((highlight, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <highlight.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-2">{highlight.stat}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-16">
        {/* Our Story - Enhanced */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4 text-sm font-medium">
                <Heart className="w-4 h-4" />
                Our Story
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                From a Small Dream to a 
                <span className="text-green-600"> Thriving Reality</span>
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  TOFA (Tarasvie Organic Farms & Aromatics) began as a small family farm in the pristine valleys of
                  Himachal Pradesh in 1995. What started with just 2 acres of apple orchard has grown into a thriving
                  organic farm spanning over 50 acres across the Himalayan foothills.
                </p>
                <p>
                  Our founder, <strong>Veeresh</strong>, was inspired by his grandfather's traditional farming methods and decided
                  to combine ancient wisdom with modern organic practices. Today, we're proud to be one of the leading
                  certified organic farms in North India, setting standards for sustainable agriculture.
                </p>
                <p>
                  We believe that <em>healthy soil produces healthy food, which leads to healthy people and a healthy
                  planet</em>. This philosophy drives everything we do, from the way we nurture our crops to how we package
                  and deliver our products with love and care.
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
                <blockquote className="text-lg italic text-gray-700">
                  "Every fruit we grow carries the essence of the Himalayas - pure, natural, and filled with the love of traditional farming."
                </blockquote>
                <cite className="text-green-700 font-medium mt-2 block">— Veeresh, Founder</cite>
              </div>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl opacity-20 blur-lg"></div>
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="TOFA Farm in Himachal Pradesh"
                width={600}
                height={500}
                className="relative rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Acres of Organic Farm</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission & Values - Enhanced */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4 text-sm font-medium">
              <Award className="w-4 h-4" />
              Our Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Drives Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our core values shape every decision we make, from how we tend our soil to how we serve our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Sustainability First</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We practice regenerative agriculture that improves soil health, enhances biodiversity, and creates a positive environmental impact for future generations.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Zero synthetic chemicals</li>
                  <li>• Composting & natural fertilizers</li>
                  <li>• Water conservation practices</li>
                  <li>• Biodiversity preservation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-rose-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Health & Wellness</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Every product is carefully grown and processed with your health and wellbeing in mind, ensuring maximum nutrition and therapeutic benefits.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Nutrient-dense produce</li>
                  <li>• Therapeutic essential oils</li>
                  <li>• Chemical-free processing</li>
                  <li>• Quality tested products</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Community Impact</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We support local farmers, provide fair employment opportunities, and contribute to the economic growth and development of our region.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Fair trade practices</li>
                  <li>• Local employment</li>
                  <li>• Farmer education programs</li>
                  <li>• Community development</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Uncompromising Quality</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We maintain the highest standards from farm to table, ensuring every product meets our rigorous quality and freshness criteria.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Certified organic practices</li>
                  <li>• Rigorous quality control</li>
                  <li>• Fresh harvest delivery</li>
                  <li>• Customer satisfaction guarantee</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Certifications & Awards - New Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4 text-sm font-medium">
              <Shield className="w-4 h-4" />
              Certifications
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Trusted & Certified</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality and sustainability is validated by leading certification bodies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-2 border-green-200 hover:border-green-400 transition-colors">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-green-700">NPOP Certified</h3>
                <p className="text-gray-600 text-sm">National Programme for Organic Production</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-green-200 hover:border-green-400 transition-colors">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-green-700">ISO 22000</h3>
                <p className="text-gray-600 text-sm">Food Safety Management System</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-green-200 hover:border-green-400 transition-colors">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-green-700">FSSAI Licensed</h3>
                <p className="text-gray-600 text-sm">Food Safety and Standards Authority</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Know Your Farmer - Enhanced */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4 text-sm font-medium">
              <Users className="w-4 h-4" />
              Our Team
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet the People Behind TOFA</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our passionate team combines decades of farming experience with modern organic practices to bring you the finest products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardContent className="p-6">
                  <div className="relative mb-6">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-100"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                  <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">{member.role}</Badge>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Journey - Enhanced */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              Our Journey
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">30 Years of Growth</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From a small family dream to a leading organic farm, our journey has been marked by dedication, innovation, and unwavering commitment to quality.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <Card className="inline-block bg-white shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-green-600 text-white">{milestone.year}</Badge>
                          <p className="text-gray-700 font-medium">{milestone.event}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Visit Our Farm - Enhanced */}
        <section className="mb-12">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-600 to-emerald-700 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <CardContent className="relative z-10 p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4 text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    Visit Us
                  </div>
                  <h2 className="text-4xl font-bold mb-6">Experience Farm Life</h2>
                  <p className="text-green-100 mb-6 text-lg leading-relaxed">
                    Located in the beautiful apple belt of Himachal Pradesh, our farm is open for visits and orchard stay
                    experiences. Come witness sustainable farming in action and taste nature's bounty fresh from the source.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-green-300" />
                      <div>
                        <p className="font-semibold">TOFA Organic Farms</p>
                        <p className="text-green-200 text-sm">Village Dhumadhar, Shimla District, Himachal Pradesh 171207</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/orchard-stay">
                      <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 px-6 py-3">
                        Book Farm Stay
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 px-6 py-3">
                        Plan Your Visit
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <h3 className="text-xl font-bold mb-4">What You'll Experience</h3>
                    <ul className="space-y-3 text-green-100">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                        Guided farm tours
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                        Organic farming workshops
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                        Fresh fruit picking
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                        Essential oil distillation demos
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                        Traditional mountain cuisine
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-300 rounded-full"></span>
                        Himalayan sunrise views
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
