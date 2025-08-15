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
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Calendar,
  Phone,
  Mail,
  Copy,
  Share2
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

interface Order {
  id: string
  orderNumber: string
  date: string
  status: string
  total: number
  items: number
  trackingNumber?: string
  paymentMethod: string
  orderItems: Array<{
    name: string
    quantity: number
    price: number
    image?: string
    unit: string
  }>
  shippingAddress: {
    name: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }
  subtotal: number
  shippingCost: number
  tax: number
  paymentStatus: string
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState<string | null>(null)
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())
  const [showOldOrders, setShowOldOrders] = useState(false)
  const { toast } = useToast()

  // Separate recent orders (last 30 days) from old orders
  const currentDate = new Date()
  const thirtyDaysAgo = new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000))
  
  const recentOrders = orders.filter(order => new Date(order.date) >= thirtyDaysAgo)
  const oldOrders = orders.filter(order => new Date(order.date) < thirtyDaysAgo)

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
          trackingNumber: order.trackingNumber || `TRK${order.orderNumber.slice(-8)}`,
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

        setOrders(transformedOrders.sort((a: Order, b: Order) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ))
      } catch (err: any) {
        console.error('Error fetching orders:', err)
        setError(err.message || 'Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const handleCancelOrder = async (orderId: string, orderNumber: string) => {
    setCancelling(orderId)
    try {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'POST',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to cancel order')
      }

      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' }
            : order
        )
      )

      toast({
        title: "Order Cancelled",
        description: `Order #${orderNumber} has been cancelled successfully.`,
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

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "confirmed":
      case "processing":
        return <Package className="h-4 w-4 text-blue-500" />
      case "shipped":
        return <Truck className="h-4 w-4 text-purple-500" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <X className="h-4 w-4 text-red-500" />
      default:
        return <Package className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "confirmed":
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "shipped":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200"
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const copyTrackingNumber = (trackingNumber: string) => {
    navigator.clipboard.writeText(trackingNumber)
    toast({
      title: "Copied!",
      description: "Tracking number copied to clipboard.",
    })
  }

  const shareTrackingLink = async (order: Order) => {
    const trackingUrl = `${window.location.origin}/track-order?tracking=${order.trackingNumber}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Track Order #${order.orderNumber}`,
          text: `Track your order from Tarasvie`,
          url: trackingUrl,
        })
      } catch (err) {
        // Fallback to clipboard if share fails
        navigator.clipboard.writeText(trackingUrl)
        toast({
          title: "Link copied!",
          description: "Tracking link copied to clipboard.",
        })
      }
    } else {
      navigator.clipboard.writeText(trackingUrl)
      toast({
        title: "Link copied!",
        description: "Tracking link copied to clipboard.",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const OrderCard = ({ order, isCompact = false }: { order: Order; isCompact?: boolean }) => {
    const isExpanded = expandedOrders.has(order.id)
    
    return (
      <Card className={`transition-all duration-200 hover:shadow-md ${isCompact ? 'border-l-4' : ''}`} 
            style={isCompact ? { borderLeftColor: getStatusColor(order.status).includes('green') ? '#16a34a' : 
                                                   getStatusColor(order.status).includes('blue') ? '#2563eb' :
                                                   getStatusColor(order.status).includes('orange') ? '#ea580c' :
                                                   getStatusColor(order.status).includes('purple') ? '#9333ea' :
                                                   getStatusColor(order.status).includes('red') ? '#dc2626' : '#6b7280' } : {}}>
        <CardHeader className={isCompact ? "pb-3" : "pb-4"}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(order.status)}
              <div>
                <CardTitle className="text-base font-semibold">
                  Order #{order.orderNumber}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(order.date)}
                  <span>•</span>
                  <span>{order.items} item{order.items > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getStatusColor(order.status)}>
                {order.status.toUpperCase()}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleOrderExpansion(order.id)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Compact Summary */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-semibold">₹{order.total}</div>
            {order.trackingNumber && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyTrackingNumber(order.trackingNumber!)}
                  className="h-8 px-2 text-xs"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  {order.trackingNumber}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => shareTrackingLink(order)}
                  className="h-8 w-8 p-0"
                >
                  <Share2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Real-time Tracking Link */}
          {order.trackingNumber && order.status === 'shipped' && (
            <div className="mb-3">
              <Link
                href={`/track-order?tracking=${order.trackingNumber}`}
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Truck className="h-4 w-4" />
                Track in real-time
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          )}

          {/* Expanded Details */}
          <Collapsible open={isExpanded}>
            <CollapsibleContent className="space-y-4">
              <Separator />
              
              {/* Order Items */}
              <div>
                <h4 className="font-medium text-sm mb-2">Items</h4>
                <div className="space-y-2">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                        )}
                        <span>{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div>{item.quantity} {item.unit}</div>
                        <div className="text-muted-foreground">₹{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="font-medium text-sm mb-2">Delivery Address</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.shippingAddress.name}</span>
                    <Phone className="h-3 w-3" />
                    <span>{order.shippingAddress.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>
                      {order.shippingAddress.address}, {order.shippingAddress.city}, 
                      {order.shippingAddress.state} - {order.shippingAddress.pincode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h4 className="font-medium text-sm mb-2">Order Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{order.shippingCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{order.tax}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{order.total}</span>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="flex gap-2 pt-2">
                {order.status === "pending" && (
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
                          Cancel Order #{order.orderNumber}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel this order? This action cannot be undone.
                          You will receive a refund within 3-5 business days if payment was already processed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Order</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleCancelOrder(order.id, order.orderNumber)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Cancel Order
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                {order.trackingNumber && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Track Package
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Track Order #{order.orderNumber}</DialogTitle>
                        <DialogDescription>
                          Real-time tracking information for your package
                        </DialogDescription>
                      </DialogHeader>
                      <OrderTracking trackingNumber={order.trackingNumber} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Post-delivery actions for delivered orders */}
          {order.status === "delivered" && !isExpanded && (
            <div className="mt-3 pt-3 border-t">
              <PostDeliveryActions order={order} />
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your orders</h1>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Error loading orders</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          Track your orders and manage deliveries
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your orders here
          </p>
          <Link href="/products">
            <Button>
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Recent Orders */}
          {recentOrders.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          )}

          {/* Old Orders Dropdown */}
          {oldOrders.length > 0 && (
            <div className="mt-8">
              <Collapsible open={showOldOrders} onOpenChange={setShowOldOrders}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-12 text-left border border-dashed"
                  >
                    <span className="font-medium">
                      Older Orders ({oldOrders.length})
                    </span>
                    {showOldOrders ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-2">
                  {oldOrders.map((order) => (
                    <OrderCard key={order.id} order={order} isCompact={true} />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
