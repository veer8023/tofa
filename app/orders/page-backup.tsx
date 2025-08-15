"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  MapPin, 
  X, 
  AlertTriangle,
  Loader2,
  Eye,
  ExternalLink
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { PostDeliveryActions } from "@/components/post-delivery-actions"
import OrderTracking from "@/components/order-tracking"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }

        const data = await response.json()
        
        // Transform the data to match the expected format
        const transformedOrders = data.orders.map((order: any) => ({
          id: order.id,
          orderNumber: order.orderNumber,
          date: order.createdAt,
          status: order.status.toLowerCase(),
          total: order.total,
          items: order.orderItems.length,
          trackingNumber: `TRK${order.orderNumber.slice(-8)}`,
          paymentMethod: order.paymentMethod.toLowerCase(),
          orderItems: order.orderItems.map((item: any) => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.price,
            image: item.product.image,
            unit: item.product.unit
          })),
          shippingAddress: {
            name: order.shippingName,
            phone: order.shippingPhone,
            address: order.shippingAddress,
            city: order.shippingCity,
            state: order.shippingState,
            pincode: order.shippingPincode
          },
          subtotal: order.subtotal,
          shippingCost: order.shippingCost,
          tax: order.tax,
          paymentStatus: order.paymentStatus
        }))

        setOrders(transformedOrders)
      } catch (err: any) {
        console.error('Error fetching orders:', err)
        setError(err.message || 'Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const canCancelOrder = (status: string) => {
    const cancellableStatuses = ['pending', 'processing']
    return cancellableStatuses.includes(status.toLowerCase())
  }

  const handleCancelOrder = async (orderId: string, orderNumber: string) => {
    setCancelling(orderId)
    try {
      console.log('Cancelling order:', orderId)
      
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      console.log('Order cancelled successfully:', data)

      // Update the order status in the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' }
            : order
        )
      )

      toast({
        title: "Order Cancelled",
        description: `Order ${orderNumber} has been successfully cancelled.`,
      })
    } catch (error: any) {
      console.error('Error cancelling order:', error)
      toast({
        title: "Cancellation Failed",
        description: error.message || "Failed to cancel order. Please try again.",
        variant: "destructive"
      })
    } finally {
      setCancelling(null)
    }
  }

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase()
    switch (statusLower) {
      case "pending":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "confirmed":
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <X className="h-4 w-4 text-red-600" />
      default:
        return <Package className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase()
    switch (statusLower) {
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "confirmed":
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
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

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="h-12 w-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-red-900 mb-2">Failed to Load Orders</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-green-600 hover:bg-green-700"
        >
          Try Again
        </Button>
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
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700">Browse Products</Button>
            </Link>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                    <p className="font-semibold capitalize">
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Order Items Preview */}
                {order.orderItems && order.orderItems.length > 0 && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Items in this order:</p>
                    <div className="space-y-1">
                      {order.orderItems.slice(0, 3).map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.name} × {item.quantity} {item.unit || 'unit'}
                          </span>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      {order.orderItems.length > 3 && (
                        <p className="text-xs text-gray-500">
                          +{order.orderItems.length - 3} more items
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Delivery Address:</span>
                    </div>
                    <div className="ml-6 text-sm text-blue-700">
                      <p className="font-medium">{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                      <p>Phone: {order.shippingAddress.phone}</p>
                    </div>
                  </div>
                )}

                {order.trackingNumber && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">Tracking Number:</span>
                        <span className="text-sm font-mono">{order.trackingNumber}</span>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Track Package
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Track Your Package</DialogTitle>
                              <DialogDescription>
                                Real-time tracking information for order #{order.id}
                              </DialogDescription>
                            </DialogHeader>
                            <OrderTracking
                              orderId={order.id}
                              trackingNumber={order.trackingNumber}
                              courierService={order.courierService || "delhivery"}
                              currentStatus={order.status}
                              estimatedDelivery={order.estimatedDelivery}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {(order.status === "shipped" || order.status === "SHIPPED") && order.trackingNumber && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700">
                          <Package className="h-4 w-4 mr-1" />
                          Track Package
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Track Your Package</DialogTitle>
                          <DialogDescription>
                            Real-time tracking information for order #{order.id}
                          </DialogDescription>
                        </DialogHeader>
                        <OrderTracking
                          orderId={order.id}
                          trackingNumber={order.trackingNumber}
                          courierService={order.courierService || "delhivery"}
                          currentStatus={order.status}
                          estimatedDelivery={order.estimatedDelivery}
                        />
                      </DialogContent>
                    </Dialog>
                  )}
                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  )}
                  {order.status === "pending" && order.paymentMethod === "cod" && (
                    <Button variant="outline" size="sm" className="text-orange-600">
                      Awaiting Confirmation
                    </Button>
                  )}
                  {canCancelOrder(order.status) && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={cancelling === order.id}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {cancelling === order.id ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 mr-2" />
                              Cancel Order
                            </>
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            Cancel Order #{order.id}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to cancel this order? This action cannot be undone.
                            You will receive a refund within 3-5 business days if payment was already processed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Keep Order</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleCancelOrder(order.id, order.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Cancel Order
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </CardContent>
              
              {/* Post-delivery actions for delivered orders */}
              {order.status === "delivered" && (
                <div className="px-6 pb-6">
                  <PostDeliveryActions order={order} />
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
