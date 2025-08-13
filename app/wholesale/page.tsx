import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import TrackingIntegration from "@/components/tracking-integration"

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Wholesale Program - TOFA",
  description: "Join our wholesale program for bulk organic products at competitive prices",
}

export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Wholesale Program
            </h1>
            <p className="text-xl mb-8">
              Partner with TOFA for premium organic products at wholesale prices. 
              Perfect for retailers, restaurants, and bulk buyers.
            </p>
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 text-lg">
              Apply for Wholesale Account
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Wholesale Program?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  📦
                </div>
                <CardTitle>Bulk Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Competitive wholesale rates for orders above minimum quantities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  🚚
                </div>
                <CardTitle>Free Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Free delivery for orders above ₹5,000 in selected areas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  🛡️
                </div>
                <CardTitle>Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  100% organic certified products with quality assurance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  👥
                </div>
                <CardTitle>Dedicated Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Personal account manager for all your wholesale needs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Wholesale Pricing Tiers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Bronze Tier</CardTitle>
                <CardDescription className="text-center">
                  Minimum Order: ₹10,000/month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-green-600 mb-2">10% OFF</div>
                  <div className="text-gray-600">Retail prices</div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Standard delivery
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Email support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Monthly invoicing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-600 border-2">
              <CardHeader>
                <Badge className="w-fit mx-auto mb-2 bg-green-600">Most Popular</Badge>
                <CardTitle className="text-center">Silver Tier</CardTitle>
                <CardDescription className="text-center">
                  Minimum Order: ₹25,000/month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-green-600 mb-2">15% OFF</div>
                  <div className="text-gray-600">Retail prices</div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Priority delivery
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Phone support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Flexible payment terms
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Custom packaging
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Gold Tier</CardTitle>
                <CardDescription className="text-center">
                  Minimum Order: ₹50,000/month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-green-600 mb-2">20% OFF</div>
                  <div className="text-gray-600">Retail prices</div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Express delivery
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Dedicated account manager
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Extended payment terms
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Private labeling options
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Exclusive products access
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Requirements to Join</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Business Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-0.5">✓</span>
                      <span>Valid business registration/GST number</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-0.5">✓</span>
                      <span>Minimum order commitment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-0.5">✓</span>
                      <span>Business address verification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-3 mt-0.5">✓</span>
                      <span>Reference from existing customers (if applicable)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="h-6 w-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">1</div>
                      <span>Submit online application</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">2</div>
                      <span>Document verification</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">3</div>
                      <span>Account approval (2-3 business days)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">4</div>
                      <span>Start ordering at wholesale prices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Integration Section */}
      <TrackingIntegration />

      {/* Contact Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses already saving with our wholesale program.
          </p>
          <div className="space-x-4">
            <Button className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 text-lg">
              Apply Now
            </Button>
            <Link href="/contact">
              <Button className="border border-white text-white hover:bg-white hover:text-green-600 px-6 py-3 text-lg">
                Contact Sales Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
