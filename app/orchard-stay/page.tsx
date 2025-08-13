"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MapPin, Clock, Star, Utensils, Bed, TreePine } from "lucide-react"
import { format } from "date-fns"

export default function OrchardStayPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()

  const reviews = [
    {
      name: "Anita Verma",
      rating: 5,
      text: "A magical escape that touched my soul! The apple orchards at sunrise were breathtaking, and every meal was a celebration of flavors. This place restored my connection with nature.",
      date: "2 weeks ago",
    },
    {
      name: "Rohit Gupta",
      rating: 5,
      text: "Our family found paradise here! The children were enchanted by apple picking and learned so much about sustainable living. The hosts made us feel like cherished family members.",
      date: "1 month ago",
    },
    {
      name: "Sunita Devi",
      rating: 4,
      text: "An oasis of serenity with spectacular mountain vistas. The traditional cottage was immaculate, and falling asleep to mountain sounds was pure bliss. Highly recommended for soul seekers.",
      date: "2 months ago",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-200/20 rounded-full blur-xl"></div>
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Additional floating elements for hero */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        
        <div className="relative container text-center text-white space-y-8 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">
            Escape to Paradise
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-green-100 max-w-3xl mx-auto">
            Discover tranquility at our enchanting mountain retreat. Sleep under star-filled skies, 
            savor garden-fresh delicacies, and reconnect with nature's rhythm in the pristine valleys of Himachal Pradesh.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
              Reserve Your Escape
            </Button>
            <Button variant="outline" className="border-2 border-green-300 text-green-300 hover:bg-green-300 hover:text-green-900 px-8 py-3 text-lg backdrop-blur-sm">
              Explore Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-2">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Apple Orchard"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-tl-lg hover:scale-105 transition-transform duration-300"
                  />
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Farm Stay Accommodation"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-tr-lg hover:scale-105 transition-transform duration-300"
                  />
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Organic Farm"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-bl-lg hover:scale-105 transition-transform duration-300"
                  />
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Mountain Views"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-br-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Experience Details */}
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                    <TreePine className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-green-700 to-emerald-800 bg-clip-text text-transparent">What's Included</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Bed className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Luxury Mountain Retreat</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Elegantly appointed rooms with breathtaking Himalayan panoramas and premium comfort</p>
                  </div>

                  <div className="text-center space-y-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Utensils className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Gourmet Farm Cuisine</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Artisanal meals crafted from our heritage gardens and local mountain delicacies</p>
                  </div>

                  <div className="text-center space-y-3 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <TreePine className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">Authentic Farm Adventures</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">Immersive orchard experiences, traditional harvesting, and ancient farming wisdom</p>
                  </div>
                </div>

                <div className="space-y-6 bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-xl bg-gradient-to-r from-green-700 to-emerald-800 bg-clip-text text-transparent">Daily Rhythm of Paradise</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">7:00 AM - Dawn Mountain Meditation</div>
                        <div className="text-sm text-gray-600">Peaceful sunrise walks through fragrant apple blossoms and ancient trails</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">8:30 AM - Mountain Harvest Feast</div>
                        <div className="text-sm text-gray-600">Artisanal breakfast featuring warm apple pastries, mountain honey, and herbal teas</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">10:00 AM - Orchard Discovery Journey</div>
                        <div className="text-sm text-gray-600">
                          Hands-on apple harvesting, traditional pruning arts, and ancestral farming secrets
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">1:00 PM - Garden Symphony Lunch</div>
                        <div className="text-sm text-gray-600">Seasonal treasures from our terraced gardens with Himalayan herbs and spices</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">3:00 PM - Tranquil Mountain Escape</div>
                        <div className="text-sm text-gray-600">
                          Personal time for meditation, nature photography, or village exploration
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">7:00 PM - Starlight Feast & Stories</div>
                        <div className="text-sm text-gray-600">
                          Mountain cuisine under starlit skies with folk tales and traditional music
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold">{review.name}</div>
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <p className="text-gray-600">{review.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book Your Stay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">₹2,500</span>
                    <span className="text-sm text-gray-500">per person/night</span>
                  </div>
                  <div className="text-sm text-gray-600">Minimum 2 nights stay</div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Check-in Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Number of Guests</label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>5+ Guests</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">Book Now</Button>

                <div className="text-xs text-gray-500 text-center">
                  Free cancellation up to 48 hours before check-in
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Shimla District, Himachal Pradesh</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Located in the heart of apple country, our farm offers stunning views of the Himalayas and easy
                    access to local attractions.
                  </div>
                  <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Interactive Map</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
