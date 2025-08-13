"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import OrderTracking from "@/components/order-tracking"
import { Package, Search, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  orderNumber: string
  status: string
  trackingNumber?: string
  courierService?: string
  estimatedDelivery?: string
  realTimeTracking?: {
    trackingNumber: string
    status: string
    courierService: string
    estimatedDelivery?: string
    deliveryUrl?: string
    events: Array<{
      timestamp: string
      status: string
      location: string
      description: string
    }>
  }
  user?: {
    email: string
    name: string
  }
}

function TrackOrderContent() {
  const searchParams = useSearchParams()
  const [trackingInput, setTrackingInput] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get tracking number from URL params
  useEffect(() => {
    const trackingNumber = searchParams.get('tracking')
    const orderNumber = searchParams.get('order')
    
    if (trackingNumber) {
      setTrackingInput(trackingNumber)
      handleTrackOrder(trackingNumber, orderNumber || undefined)
    }
  }, [searchParams])

  const handleTrackOrder = async (trackingNumber?: string, orderNumber?: string) => {
    const trackingQuery = trackingNumber || trackingInput
    
    if (!trackingQuery) {
      setError("Please enter a tracking number or order number")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Try to find order by tracking number or order number
      const response = await fetch(
        `/api/orders/track?${trackingQuery.startsWith('ORD') ? 'orderNumber' : 'trackingNumber'}=${trackingQuery}`
      )

      if (!response.ok) {
        throw new Error("Order not found")
      }

      const data = await response.json()
      setOrder(data.order)
    } catch (err: any) {
      setError(err.message || "Failed to find order")
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/orders" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Link>
        <h1 className="text-3xl font-bold text-green-900 mb-2">Track Your Order</h1>
        <p className="text-gray-600">
          Enter your tracking number or order number to get real-time updates
        </p>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Track Package
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="tracking-input">
                Tracking Number or Order Number
              </Label>
              <Input
                id="tracking-input"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter tracking number (e.g., 1234567890) or order number (e.g., ORD123456)"
                className="mt-2"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={() => handleTrackOrder()}
                disabled={loading || !trackingInput}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? (
                  <>
                    <Package className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tracking Results */}
      {order && (
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-medium">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium capitalize">{order.status}</p>
                </div>
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-gray-600">Tracking Number</p>
                    <p className="font-mono font-medium">{order.trackingNumber}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Tracking */}
          {order.trackingNumber && (
            <OrderTracking
              orderId={order.id}
              trackingNumber={order.trackingNumber}
              courierService={order.courierService || "delhivery"}
              currentStatus={order.status}
              estimatedDelivery={order.estimatedDelivery}
            />
          )}

          {/* Real-time Tracking Section */}
          {order.realTimeTracking && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Live Tracking from {order.realTimeTracking.courierService}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current Status</p>
                      <p className="font-semibold">{order.realTimeTracking.status}</p>
                    </div>
                    {order.realTimeTracking.deliveryUrl && (
                      <a
                        href={order.realTimeTracking.deliveryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        Track on {order.realTimeTracking.courierService}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  
                  {order.realTimeTracking.estimatedDelivery && (
                    <div>
                      <p className="text-sm text-gray-600">Estimated Delivery</p>
                      <p className="font-medium">
                        {new Date(order.realTimeTracking.estimatedDelivery).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}

                  {order.realTimeTracking.events && order.realTimeTracking.events.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-3">Recent Updates</p>
                      <div className="space-y-3">
                        {order.realTimeTracking.events.slice(0, 3).map((event, index) => (
                          <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <p className="font-medium text-sm">{event.status}</p>
                                <span className="text-xs text-gray-500">
                                  {new Date(event.timestamp).toLocaleDateString('en-IN')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{event.location}</p>
                              <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Courier Services Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Supported Courier Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-900">Delhivery</p>
              <p className="text-xs text-blue-600">Real-time tracking</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="font-semibold text-red-900">Blue Dart</p>
              <p className="text-xs text-red-600">Express delivery</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-900">DTDC</p>
              <p className="text-xs text-green-600">Pan-India network</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="font-semibold text-purple-900">FedEx</p>
              <p className="text-xs text-purple-600">International</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            We integrate with multiple courier services to provide real-time tracking updates directly from the delivery partner.
          </p>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">How to find your tracking information:</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                <li>Check your order confirmation email for the tracking number</li>
                <li>Log into your account and view your orders</li>
                <li>Use your order number (starts with ORD) if you don't have the tracking number</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium">Tracking not working?</h4>
              <p className="text-sm text-gray-600 mt-1">
                It may take 24-48 hours for tracking information to appear after your order is shipped.
                If you're still having issues, please contact our support team.
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/orders">View All Orders</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center justify-center py-8">
          <Package className="h-8 w-8 animate-spin text-green-600" />
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  )
}
