"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, MapPin, Calendar, Building } from "lucide-react"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    // Simulate order details
    const mockOrderDetails = {
      orderId,
      status: "confirmed",
      paymentMethod: "cod",
      total: 1250,
      items: [
        { name: "Organic Apple", quantity: 2, price: 180 },
        { name: "Lemongrass Essential Oil", quantity: 1, price: 350 },
      ],
      shippingAddress: {
        fullName: "John Doe",
        addressLine1: "123 Main Street",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
      },
      estimatedDelivery: "2-3 business days",
      trackingNumber: `TRK${Date.now()}`,
    }

    setOrderDetails(mockOrderDetails)
  }, [orderId])

  if (!orderDetails) {
    return <div className="container py-12 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-900 mb-2">Order Confirmed!</h1>
            <p className="text-lg text-gray-600">
              Thank you for your order. We'll send you updates as your order progresses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-green-600" />
                  <span>Order Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order ID:</span>
                  <span className="font-mono text-sm">{orderDetails.orderId}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  <Badge className="bg-green-100 text-green-800">
                    {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Payment Method:</span>
                  <div className="flex items-center space-x-1">
                    <Building className="h-4 w-4" />
                    <span>Cash on Delivery</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-semibold text-lg">₹{orderDetails.total}</span>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Items Ordered:</h4>
                  <div className="space-y-2">
                    {orderDetails.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Delivery */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span>Shipping & Delivery</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Shipping Address:</span>
                  </div>
                  <div className="ml-6 text-sm text-gray-600">
                    {orderDetails.shippingAddress.fullName}
                    <br />
                    {orderDetails.shippingAddress.addressLine1}
                    <br />
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} -{" "}
                    {orderDetails.shippingAddress.pincode}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Estimated Delivery:</span>
                  <span>{orderDetails.estimatedDelivery}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Tracking Number:</span>
                  <span className="font-mono text-sm">{orderDetails.trackingNumber}</span>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">What's Next?</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• We'll prepare your organic products with care</li>
                    <li>• You'll receive tracking information via email</li>
                    <li>• Your fresh produce will be delivered in 2-3 days</li>
                    <li>• Pay the delivery person when you receive your order</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/orders">
              <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700">Track Your Orders</Button>
            </Link>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-8 p-6 bg-white rounded-lg">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600">
                WhatsApp: +91 98765 43210
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
