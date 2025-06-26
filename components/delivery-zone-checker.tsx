"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, MapPin } from "lucide-react"

export function DeliveryZoneChecker() {
  const [pincode, setPincode] = useState("")
  const [result, setResult] = useState<{ available: boolean; message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const serviceableAreas = ["Himachal Pradesh", "Chandigarh", "Punjab", "Haryana", "Delhi"]

  // Mock pincode data for demonstration
  const serviceablePincodes = [
    "110001",
    "110002",
    "110003", // Delhi
    "160001",
    "160002",
    "160003", // Chandigarh
    "141001",
    "141002",
    "141003", // Punjab
    "122001",
    "122002",
    "122003", // Haryana
    "171001",
    "171002",
    "171003", // Himachal Pradesh
  ]

  const checkDelivery = async () => {
    if (!pincode || pincode.length !== 6) {
      setResult({ available: false, message: "Please enter a valid 6-digit pincode" })
      return
    }

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const isServiceable = serviceablePincodes.some((code) => code.startsWith(pincode.substring(0, 3)))

    setResult({
      available: isServiceable,
      message: isServiceable
        ? "Great! We deliver to your area. Expected delivery: 2-3 business days."
        : "Sorry, we don't deliver to this area yet. We're expanding soon!",
    })

    setLoading(false)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900">Check Delivery Availability</h2>
            <p className="text-lg text-gray-600">Enter your pincode to see if we deliver to your area</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Delivery Checker</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter 6-digit pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                    className="flex-1"
                  />
                  <Button onClick={checkDelivery} disabled={loading} className="bg-green-600 hover:bg-green-700">
                    {loading ? "Checking..." : "Check"}
                  </Button>
                </div>

                {result && (
                  <div
                    className={`flex items-center space-x-2 p-4 rounded-lg ${
                      result.available ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                    }`}
                  >
                    {result.available ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    <span>{result.message}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle>Current Service Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serviceableAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Coming Soon:</strong> We're expanding to more states across India. Stay tuned for updates!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
