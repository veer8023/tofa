import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Retail Shopping - TOFA",
  description: "Shop premium organic products for your family and home",
}

export default function RetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Retail Shopping
            </h1>
            <p className="text-xl mb-8">
              Discover premium organic products for your family. 
              Fresh, healthy, and sustainably sourced.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-lg">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Shop Retail with TOFA?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  🌱
                </div>
                <CardTitle>100% Organic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Certified organic products free from pesticides and chemicals
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  🚚
                </div>
                <CardTitle>Home Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Free delivery on orders above ₹500 in select areas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  💰
                </div>
                <CardTitle>Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Competitive retail pricing with regular discounts and offers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  🛡️
                </div>
                <CardTitle>Quality Assured</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Money-back guarantee on all products with quality issues
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">🍎</div>
                  <CardTitle className="text-2xl">Fresh Fruits</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-6">
                  Seasonal organic fruits directly from our farm. Rich in vitamins, 
                  minerals, and natural goodness.
                </p>
                <div className="text-center">
                  <Button className="w-full">
                    <Link href="/products?category=FRUITS">Shop Fruits</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">🌿</div>
                  <CardTitle className="text-2xl">Aromatic Oils</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-6">
                  Pure essential oils extracted from organic herbs and plants. 
                  Perfect for aromatherapy and wellness.
                </p>
                <div className="text-center">
                  <Button className="w-full">
                    <Link href="/products?category=AROMATICS">Shop Oils</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Special Offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-green-500 border-2">
              <CardHeader>
                <CardTitle className="text-center text-green-600">First Order</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">10% OFF</div>
                <p className="text-gray-600 mb-4">
                  Get 10% off on your first order above ₹1000
                </p>
                <p className="text-sm text-gray-500">Use code: WELCOME10</p>
              </CardContent>
            </Card>

            <Card className="border-blue-500 border-2">
              <CardHeader>
                <CardTitle className="text-center text-blue-600">Free Delivery</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">₹0</div>
                <p className="text-gray-600 mb-4">
                  Free delivery on all orders above ₹500
                </p>
                <p className="text-sm text-gray-500">No minimum order for premium members</p>
              </CardContent>
            </Card>

            <Card className="border-purple-500 border-2">
              <CardHeader>
                <CardTitle className="text-center text-purple-600">Bulk Orders</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">15% OFF</div>
                <p className="text-gray-600 mb-4">
                  Save more when you buy in larger quantities
                </p>
                <p className="text-sm text-gray-500">Minimum 5kg for fruits, 50ml for oils</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Customer Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Easy Returns</h3>
                    <p className="text-gray-600">7-day return policy for unopened products</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Secure Payments</h3>
                    <p className="text-gray-600">Multiple payment options with secure checkout</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Customer Support</h3>
                    <p className="text-gray-600">24/7 customer support via phone and email</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Fresh Guarantee</h3>
                    <p className="text-gray-600">Products delivered fresh within 24-48 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Loyalty Rewards</h3>
                    <p className="text-gray-600">Earn points on every purchase for future discounts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Recipe Suggestions</h3>
                    <p className="text-gray-600">Free recipes and usage tips with your orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Shopping Today!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who choose TOFA for their organic needs.
          </p>
          <div className="space-x-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-lg">
              <Link href="/products">Browse Products</Link>
            </Button>
            <Link href="/auth/register">
              <Button className="border border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 text-lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
