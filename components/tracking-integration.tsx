"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Package, Globe, CheckCircle, ExternalLink } from "lucide-react"

interface TrackingIntegrationProps {
  className?: string
}

export default function TrackingIntegration({ className }: TrackingIntegrationProps) {
  const courierServices = [
    {
      name: "Delhivery",
      logo: "🚚",
      coverage: "Pan India",
      features: ["Real-time tracking", "SMS updates", "WhatsApp notifications"],
      trackingUrl: "https://www.delhivery.com/track/package/",
      color: "blue"
    },
    {
      name: "Blue Dart",
      logo: "✈️",
      coverage: "Express Delivery",
      features: ["Same day delivery", "COD available", "Live tracking"],
      trackingUrl: "https://www.bluedart.com/tracking",
      color: "red"
    },
    {
      name: "DTDC",
      logo: "📦",
      coverage: "Economy & Express",
      features: ["Cost effective", "Rural reach", "Bulk shipping"],
      trackingUrl: "https://www.dtdc.in/tracking.asp",
      color: "green"
    },
    {
      name: "FedEx",
      logo: "🌏",
      coverage: "International",
      features: ["Global shipping", "Priority delivery", "Customs clearance"],
      trackingUrl: "https://www.fedex.com/fedextrack/",
      color: "purple"
    }
  ]

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
            <Package className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-semibold">Real-time Package Tracking</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Track Your Orders with Live Delivery Updates
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We've integrated with major courier services to provide you with real-time tracking 
            updates directly from the delivery partner. No more guessing - know exactly where your package is.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Live Updates</h3>
              <p className="text-gray-600 text-sm">
                Real-time tracking updates directly from courier partners with location details
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Multiple Carriers</h3>
              <p className="text-gray-600 text-sm">
                Integrated with Delhivery, Blue Dart, DTDC, FedEx and more delivery partners
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Delivery Estimates</h3>
              <p className="text-gray-600 text-sm">
                Get accurate delivery estimates and notifications for failed delivery attempts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Courier Services */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Supported Delivery Partners</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courierServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-3">
                  <div className="text-3xl mb-2">{service.logo}</div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {service.coverage}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(service.trackingUrl, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Track Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How Real-time Tracking Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h4 className="font-semibold mb-2">Order Placed</h4>
                <p className="text-sm text-gray-600">
                  Your order is confirmed and assigned a tracking number
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h4 className="font-semibold mb-2">Courier Integration</h4>
                <p className="text-sm text-gray-600">
                  We automatically sync with the courier's tracking system
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h4 className="font-semibold mb-2">Live Updates</h4>
                <p className="text-sm text-gray-600">
                  Get real-time location and status updates as package moves
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  4
                </div>
                <h4 className="font-semibold mb-2">Delivered</h4>
                <p className="text-sm text-gray-600">
                  Receive confirmation when package is successfully delivered
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
