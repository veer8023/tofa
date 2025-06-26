"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    // Mock orders data - in real app, fetch from API
    const mockOrders = [
      {
        id: "TOFA1234567890",
        date: "2024-01-15",
        status: "delivered",
        total: 1250,
        items: 3,
        trackingNumber: "TRK1234567890",
        paymentMethod: "razorpay",
      },
      {
        id: "TOFA1234567891",
        date: "2024-01-20",
        status: "shipped",
        total: 850,
        items: 2,
        trackingNumber: "TRK1234567891",
        paymentMethod: "cod",
      },
      {
        id: "TOFA1234567892",
        date: "2024-01-22",
        status: "processing",
        total: 1500,
        items: 4,
        trackingNumber: "TRK1234567892",
        paymentMethod: "stripe",
      },
    ]

    setOrders(mockOrders)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user) {
    return (
      <div className="container py-12 text-center">
        <p>Please log in to view your orders.</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-green-900 mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-4">Start shopping for organic products!</p>
            <Button className="bg-green-600 hover:bg-green-700">Browse Products</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-semibold">₹{order.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Items</p>
                    <p className="font-semibold">{order.items} items</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold capitalize">{order.paymentMethod}</p>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">Tracking Number:</span>
                      <span className="text-sm font-mono">{order.trackingNumber}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {order.status === "shipped" && (
                    <Button variant="outline" size="sm">
                      Track Package
                    </Button>
                  )}
                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
