import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: "1",
    title: "The Benefits of Organic Farming for Soil Health",
    excerpt: "Discover how organic farming practices improve soil quality and create sustainable ecosystems.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Farming",
    author: "Dr. Rajesh Kumar",
    date: "2024-01-15",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Essential Oils: Nature's Medicine Cabinet",
    excerpt: "Learn about the therapeutic properties of essential oils and how to use them safely.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Health",
    author: "Priya Sharma",
    date: "2024-01-10",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "Seasonal Fruit Guide: What to Eat When",
    excerpt: "A comprehensive guide to seasonal fruits and their nutritional benefits throughout the year.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Nutrition",
    author: "Meera Patel",
    date: "2024-01-05",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Sustainable Packaging: Our Commitment to the Environment",
    excerpt: "How TOFA is reducing environmental impact through innovative packaging solutions.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Sustainability",
    author: "Amit Singh",
    date: "2024-01-01",
    readTime: "4 min read",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl font-bold mb-4">TOFA Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Insights on organic farming, health benefits, sustainability, and more from our experts.
          </p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-green-600">{post.category}</Badge>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
