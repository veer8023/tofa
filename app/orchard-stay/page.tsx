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
      text: "Amazing experience! The apple orchards are beautiful and the farm-to-table meals were incredible.",
      date: "2 weeks ago",
    },
    {
      name: "Rohit Gupta",
      rating: 5,
      text: "Perfect getaway from city life. Kids loved picking apples and learning about organic farming.",
      date: "1 month ago",
    },
    {
      name: "Sunita Devi",
      rating: 4,
      text: "Peaceful location with stunning mountain views. The accommodation was comfortable and clean.",
      date: "2 months ago",
    },
  ]

  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-green-600 to-green-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container h-full flex items-center">
          <div className="text-white space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Orchard Stay Experience</h1>
            <p className="text-xl max-w-2xl">
              Immerse yourself in nature with our unique farm stay experience. Wake up to apple orchards, enjoy organic
              meals, and learn sustainable farming.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="grid grid-cols-2 gap-2">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Apple Orchard"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-tl-lg"
                  />
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Farm Stay Accommodation"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-tr-lg"
                  />
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Organic Farm"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-bl-lg"
                  />
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Mountain Views"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-br-lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Experience Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TreePine className="h-6 w-6 text-green-600" />
                  <span>What's Included</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Bed className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Comfortable Stay</h3>
                    <p className="text-sm text-gray-600">Cozy rooms with mountain views and modern amenities</p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Utensils className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Farm-to-Table Meals</h3>
                    <p className="text-sm text-gray-600">Organic breakfast, lunch, and dinner made from our produce</p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <TreePine className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Farming Experience</h3>
                    <p className="text-sm text-gray-600">Hands-on activities like fruit picking and organic farming</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Daily Schedule</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">7:00 AM - Morning Walk</div>
                        <div className="text-sm text-gray-600">Guided tour through apple orchards</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">8:30 AM - Organic Breakfast</div>
                        <div className="text-sm text-gray-600">Fresh fruits, homemade bread, and local delicacies</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">10:00 AM - Farming Activities</div>
                        <div className="text-sm text-gray-600">
                          Apple picking, pruning, and organic farming techniques
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">1:00 PM - Farm Lunch</div>
                        <div className="text-sm text-gray-600">Seasonal vegetables and fruits from our gardens</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">3:00 PM - Free Time</div>
                        <div className="text-sm text-gray-600">
                          Relax, explore, or participate in optional activities
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">7:00 PM - Dinner & Bonfire</div>
                        <div className="text-sm text-gray-600">
                          Traditional dinner followed by storytelling around the fire
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
