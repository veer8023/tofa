'use client'

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, Heart } from "lucide-react"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedTestimonials, setLikedTestimonials] = useState<Set<number>>(new Set())
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const familyStories = [
    {
      name: "The Sharma Family",
      location: "Delhi NCR",
      storyType: "Health Transformation",
      rating: 5,
      shortText: "TOFA's organic apples helped our diabetic father maintain better blood sugar levels naturally.",
      fullStory: "My father was diagnosed with diabetes last year, and we were looking for natural ways to support his health. TOFA's organic apples became a game-changer - they're naturally sweet but don't spike his blood sugar like regular fruits. The whole family has switched to organic eating, and we feel more energetic and healthy.",
      avatar: "SF",
      gradient: "from-emerald-400 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      product: "Organic Apples",
      likes: 156,
      verified: true,
      orderCount: "25+ orders",
      memberSince: "2023"
    },
    {
      name: "Rajesh & Priya Kumar",
      location: "Chandigarh",
      storyType: "Wellness Journey",
      rating: 5,
      shortText: "Essential oils from TOFA transformed our home spa and meditation practice completely.",
      fullStory: "We started our wellness journey during the pandemic and discovered TOFA's essential oils. The lemongrass and eucalyptus oils are incredibly pure and potent. We use them for aromatherapy, meditation, and even natural cleaning. Our home feels like a peaceful retreat now, and friends always ask about the amazing fragrance.",
      avatar: "RK",
      gradient: "from-purple-400 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-50",
      product: "Essential Oil Collection",
      likes: 203,
      verified: true,
      orderCount: "40+ orders",
      memberSince: "2022"
    },
    {
      name: "Meera & Kids",
      location: "Punjab",
      storyType: "Family Nutrition",
      rating: 5,
      shortText: "My picky eaters now love fruits! TOFA's quality made healthy eating enjoyable for the whole family.",
      fullStory: "Getting my two kids to eat fruits was a daily battle until we discovered TOFA. The apples are so crisp and sweet that even my pickiest eater asks for them. The quality is outstanding - they stay fresh for weeks, and the packaging ensures they arrive in perfect condition. My kids now prefer organic fruits over junk food!",
      avatar: "MK",
      gradient: "from-pink-400 to-rose-600",
      bgGradient: "from-pink-50 to-rose-50",
      product: "Seasonal Fruit Box",
      likes: 134,
      verified: true,
      orderCount: "30+ orders",
      memberSince: "2023"
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % familyStories.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, familyStories.length])

  const handleLike = (index: number) => {
    setLikedTestimonials(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % familyStories.length)
    setIsAutoPlaying(false)
  }

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + familyStories.length) % familyStories.length)
    setIsAutoPlaying(false)
  }

  const currentStory = familyStories[currentIndex]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50"></div>
      
      {/* Dynamic floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200/15 rounded-full blur-xl animate-pulse delay-500"></div>
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        {/* Modern Header with Statistics */}
        <div className="text-center space-y-8 mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full border border-green-200 shadow-sm">
            <Heart className="w-5 h-5 text-green-600 animate-pulse" />
            <span className="text-green-700 font-semibold">Trusted by 500+ Families</span>
            <div className="flex items-center gap-1 ml-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-green-600 ml-1">4.9/5</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-teal-800 bg-clip-text text-transparent leading-tight">
              Stories from Our Family
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Real families sharing their journey towards healthier, more sustainable living with TOFA's organic products.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-2 text-green-700">
              <span className="text-lg">👨‍👩‍👧‍👦</span>
              <span className="font-semibold">500+ Families</span>
            </div>
            <div className="flex items-center gap-2 text-blue-700">
              <span className="text-lg">🏆</span>
              <span className="font-semibold">Certified Organic</span>
            </div>
            <div className="flex items-center gap-2 text-purple-700">
              <span className="text-lg">📈</span>
              <span className="font-semibold">98% Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Featured Story Spotlight */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 max-w-6xl mx-auto relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-3xl"></div>
            </div>
            
            <div className="relative z-10">
              {/* Navigation Controls */}
              <div className="flex items-center justify-between mb-8">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={prevStory}
                  className="hover:bg-green-50 p-4 rounded-full transition-all duration-300 hover:scale-110"
                >
                  ←
                </Button>
                
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {currentStory.storyType}
                      </div>
                      {currentStory.verified && (
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          ✓ Verified Customer
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center space-x-1 mb-2">
                      {[...Array(currentStory.rating)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="hover:bg-blue-50 p-2 rounded-full"
                  >
                    {isAutoPlaying ? '⏸️' : '▶️'}
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={nextStory}
                  className="hover:bg-green-50 p-4 rounded-full transition-all duration-300 hover:scale-110"
                >
                  →
                </Button>
              </div>
              
              {/* Story Content */}
              <div className="text-center space-y-8">
                <Quote className="h-16 w-16 text-green-300 mx-auto" />
                
                <blockquote className="text-2xl md:text-3xl text-gray-700 font-light italic leading-relaxed max-w-4xl mx-auto">
                  "{currentStory.fullStory}"
                </blockquote>
                
                {/* Customer Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                  <div className={`w-20 h-20 bg-gradient-to-br ${currentStory.gradient} rounded-full flex items-center justify-center shadow-xl`}>
                    <span className="text-white font-bold text-2xl">{currentStory.avatar}</span>
                  </div>
                  
                  <div className="text-center md:text-left space-y-2">
                    <div className="font-bold text-2xl text-gray-800">{currentStory.name}</div>
                    <div className="text-gray-500 text-lg">{currentStory.location}</div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{currentStory.orderCount}</span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Since {currentStory.memberSince}</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{currentStory.product}</span>
                    </div>
                  </div>
                </div>
                
                {/* Interaction Buttons */}
                <div className="flex items-center justify-center gap-6 pt-6">
                  <Button
                    variant="ghost"
                    onClick={() => handleLike(currentIndex)}
                    className={`hover:bg-red-50 ${likedTestimonials.has(currentIndex) ? 'text-red-600' : 'text-gray-400'} transition-all duration-300 hover:scale-110`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${likedTestimonials.has(currentIndex) ? 'fill-current' : ''}`} />
                    {currentStory.likes + (likedTestimonials.has(currentIndex) ? 1 : 0)}
                  </Button>
                  <Button variant="ghost" className="hover:bg-blue-50 text-gray-400 transition-all duration-300 hover:scale-110">
                    <span className="w-5 h-5 mr-2">💬</span>
                    Share Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Story Indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {familyStories.map((story, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className="group relative"
              >
                <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-green-500 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-green-300 hover:scale-110'
                }`} />
                {index === currentIndex && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {story.storyType}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Stories Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {familyStories.slice(0, 3).map((story, index) => (
            <Card 
              key={index} 
              className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm bg-gradient-to-br ${story.bgGradient} cursor-pointer group relative overflow-hidden`}
              onClick={() => setCurrentIndex(index)}
            >
              <CardContent className="p-6 space-y-4 relative">
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Story type badge */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                    {story.storyType}
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 font-medium leading-relaxed relative z-10">"{story.shortText}"</p>
                
                <div className="flex items-center justify-between pt-4 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${story.gradient} rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <span className="text-white font-semibold text-sm">{story.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{story.name}</div>
                      <div className="text-sm text-gray-500">{story.location}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-600">{story.likes}</div>
                    <div className="text-xs text-gray-500">likes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Impact Statistics */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-white/95 via-green-50/90 to-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-green-100 max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-12">Our Family Impact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center group cursor-pointer">
                <div className="relative mb-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    500+
                  </div>
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">👨‍👩‍👧‍👦</div>
                </div>
                <div className="text-gray-600 font-semibold">Happy Families</div>
                <div className="text-sm text-gray-500 mt-1">Across North India</div>
              </div>
              
              <div className="text-center group cursor-pointer">
                <div className="relative mb-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    4.9
                  </div>
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">⭐</div>
                </div>
                <div className="text-gray-600 font-semibold">Average Rating</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              <div className="text-center group cursor-pointer">
                <div className="relative mb-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    98%
                  </div>
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">💚</div>
                </div>
                <div className="text-gray-600 font-semibold">Satisfaction Rate</div>
                <div className="text-sm text-gray-500 mt-1">Repeat Customers</div>
              </div>
              
              <div className="text-center group cursor-pointer">
                <div className="relative mb-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">🌱</div>
                </div>
                <div className="text-gray-600 font-semibold">Organic Certified</div>
                <div className="text-sm text-gray-500 mt-1">Chemical-Free</div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 pt-8 border-t border-green-100">
              <p className="text-gray-600 mb-6 text-lg">Ready to start your own healthy living story?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start Your Journey
                </Button>
                <Button variant="outline" className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  Share Your Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
