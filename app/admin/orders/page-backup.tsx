"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { 
  Search, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  RefreshCw,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Send
} from "lucide-react"

interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  orderType: "RETAIL" | "WHOLESALE"
  product: {
    id: string
    name: string
    image: string | null
    unit: string
  }
}

interface Order {
  id: string
  orderNumber: string
  userId: string
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  paymentMethod: "COD" | "ONLINE"
  paymentStatus: "PENDING" | "PAID" | "FAILED"
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  trackingNumber: string | null
  shippingAddress: string // JSON string
  notes: string | null
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string | null
    email: string
  }
  orderItems: OrderItem[]
}

interface OrderResponse {
  orders: Order[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Helper functions
const getStatusIcon = (status: string) => {
  switch (status) {
    case "PENDING":
      return <Clock className="h-4 w-4" />
    case "CONFIRMED":
    case "PROCESSING":
      return <Package className="h-4 w-4" />
    case "SHIPPED":
      return <Truck className="h-4 w-4" />
    case "DELIVERED":
      return <CheckCircle className="h-4 w-4" />
    case "CANCELLED":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800"
    case "CONFIRMED":
    case "PROCESSING":
      return "bg-blue-100 text-blue-800"
    case "SHIPPED":
      return "bg-purple-100 text-purple-800"
    case "DELIVERED":
      return "bg-green-100 text-green-800"
    case "CANCELLED":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [openDialogs, setOpenDialogs] = useState<{ [key: string]: boolean }>({})
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const { toast } = useToast()

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(statusFilter !== "all" && { status: statusFilter })
      })

      const response = await fetch(`/api/orders?${params}`)
      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const data: OrderResponse = await response.json()
      setOrders(data.orders)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [currentPage, statusFilter])

  const updateOrderStatus = async (orderId: string, newStatus: string, notes?: string, trackingNumber?: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          status: newStatus,
          notes,
          trackingNumber
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      // Refresh orders after update
      await fetchOrders()
      
      // Close the dialog
      setOpenDialogs(prev => ({ ...prev, [orderId]: false }))
      
      toast({
        title: "Success",
        description: `Order status updated to ${newStatus.toLowerCase()}`,
      })
    } catch (error) {
      console.error("Error updating order status:", error)
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const confirmOrder = async (orderId: string, estimatedDelivery?: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estimatedDelivery }),
      })

      if (!response.ok) {
        throw new Error("Failed to confirm order")
      }

      await fetchOrders()
      
      // Close the dialog
      setOpenDialogs(prev => ({ ...prev, [orderId]: false }))
      
      toast({
        title: "Order Confirmed",
        description: "Order has been confirmed and customer will be notified.",
      })
    } catch (error) {
      console.error("Error confirming order:", error)
      toast({
        title: "Error",
        description: "Failed to confirm order. Please try again.",
        variant: "destructive",
      })
    }
  }

  const shipOrder = async (orderId: string, trackingNumber: string, courierService: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/ship`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber, courierService }),
      })

      if (!response.ok) {
        throw new Error("Failed to ship order")
      }

      await fetchOrders()
      
      // Close the dialog
      setOpenDialogs(prev => ({ ...prev, [orderId]: false }))
      
      toast({
        title: "Order Shipped",
        description: `Order shipped with tracking number: ${trackingNumber}`,
      })
    } catch (error) {
      console.error("Error shipping order:", error)
      toast({
        title: "Error",
        description: "Failed to ship order. Please try again.",
        variant: "destructive",
      })
    }
  }

  const parseShippingAddress = (addressString: string) => {
    try {
      // First, check if it's already a valid JSON string
      const parsed = JSON.parse(addressString)
      return parsed
    } catch {
      // If parsing fails, treat it as a plain string address
      return {
        fullName: "",
        addressLine1: addressString || "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      }
    }
  }

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = !searchQuery || 
      order.orderNumber.toLowerCase().includes(searchLower) ||
      order.user.name?.toLowerCase().includes(searchLower) ||
      order.user.email.toLowerCase().includes(searchLower)
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    confirmed: orders.filter((o) => o.status === "CONFIRMED").length,
    processing: orders.filter((o) => o.status === "PROCESSING").length,
    shipped: orders.filter((o) => o.status === "SHIPPED").length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{orderStats.total}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{orderStats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{orderStats.confirmed}</p>
                <p className="text-sm text-gray-600">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{orderStats.processing}</p>
                <p className="text-sm text-gray-600">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-indigo-600" />
              <div>
                <p className="text-2xl font-bold">{orderStats.shipped}</p>
                <p className="text-sm text-gray-600">Shipped</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{orderStats.delivered}</p>
                <p className="text-sm text-gray-600">Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="SHIPPED">Shipped</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchOrders} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.user.name || "N/A"}</p>
                          <p className="text-sm text-gray-500">{order.user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {order.orderItems.slice(0, 2).map((item) => (
                            <p key={item.id}>
                              {item.product.name} × {item.quantity}
                            </p>
                          ))}
                          {order.orderItems.length > 2 && (
                            <p className="text-gray-500">+{order.orderItems.length - 2} more</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">₹{order.total}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog 
                            open={openDialogs[order.id] || false} 
                            onOpenChange={(open) => {
                              setOpenDialogs(prev => ({ ...prev, [order.id]: open }))
                              if (open) setSelectedOrder(order)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
                                <DialogDescription>
                                  Complete order information and status management
                                </DialogDescription>
                              </DialogHeader>
                              <OrderDetailsModal 
                                order={order} 
                                onStatusUpdate={updateOrderStatus}
                                onConfirmOrder={confirmOrder}
                                onShipOrder={shipOrder}
                              />
                            </DialogContent>
                          </Dialog>
                          
                          {/* Quick Actions based on current status */}
                          {order.status === "PENDING" && (
                            <Button 
                              size="sm"
                              onClick={() => confirmOrder(order.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirm
                            </Button>
                          )}
                          
                          {order.status === "PROCESSING" && (
                            <QuickShipDialog 
                              order={order} 
                              onShip={(trackingNumber, courier) => 
                                shipOrder(order.id, trackingNumber, courier)
                              } 
                            />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-gray-500">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                  {pagination.total} orders
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface OrderDetailsModalProps {
  order: Order
  onStatusUpdate: (orderId: string, newStatus: string, notes?: string, trackingNumber?: string) => void
  onConfirmOrder: (orderId: string, estimatedDelivery?: string) => void
  onShipOrder: (orderId: string, trackingNumber: string, courierService: string) => void
}

function OrderDetailsModal({ order, onStatusUpdate, onConfirmOrder, onShipOrder }: OrderDetailsModalProps) {
  const [notes, setNotes] = useState("")
  const [trackingNumber, setTrackingNumber] = useState("")
  const [estimatedDelivery, setEstimatedDelivery] = useState("")
  const [courierService, setCourierService] = useState("")
  
  // Safe parsing function for shipping address
  const parseShippingAddressSafe = (addressString: string) => {
    try {
      // First, check if it's already a valid JSON string
      const parsed = JSON.parse(addressString)
      return parsed
    } catch {
      // If parsing fails, treat it as a plain string address
      return {
        fullName: "",
        addressLine1: addressString || "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      }
    }
  }
  
  const shippingAddress = typeof order.shippingAddress === 'string' 
    ? parseShippingAddressSafe(order.shippingAddress) 
    : order.shippingAddress

  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <div>
        <h3 className="font-semibold mb-3">Customer Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p><span className="text-gray-600">Name:</span> {order.user.name || "N/A"}</p>
          <p><span className="text-gray-600">Email:</span> {order.user.email}</p>
          <p><span className="text-gray-600">Phone:</span> {shippingAddress.phone || "N/A"}</p>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="font-semibold mb-3">Shipping Address</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p>{shippingAddress.fullName}</p>
          <p>{shippingAddress.addressLine1}</p>
          {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
          <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}</p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h3 className="font-semibold mb-3">Order Items</h3>
        <div className="space-y-3">
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity} {item.product.unit} | Type: {item.orderType}
                </p>
                <p className="text-sm text-gray-600">Unit Price: ₹{item.price}</p>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4 mt-4 space-y-2">
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
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <h3 className="font-semibold mb-3">Payment Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p><span className="text-gray-600">Method:</span> {order.paymentMethod}</p>
          <p><span className="text-gray-600">Status:</span> 
            <Badge className="ml-2">
              {order.paymentStatus}
            </Badge>
          </p>
        </div>
      </div>

      {/* Order Status & Actions */}
      <div>
        <h3 className="font-semibold mb-3">Order Status & Actions</h3>
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Current Status:</span>
            <Badge className={getStatusColor(order.status)}>
              <div className="flex items-center gap-1">
                {getStatusIcon(order.status)}
                {order.status}
              </div>
            </Badge>
          </div>

          {/* Status-specific actions */}
          {order.status === "PENDING" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="estimated-delivery">Estimated Delivery</Label>
                  <Input
                    id="estimated-delivery"
                    type="date"
                    value={estimatedDelivery}
                    onChange={(e) => setEstimatedDelivery(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => onConfirmOrder(order.id, estimatedDelivery)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Order
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      Cancel Order
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Order</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this order? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Order</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onStatusUpdate(order.id, "CANCELLED")}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Cancel Order
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}

          {order.status === "PROCESSING" && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="tracking-number">Tracking Number</Label>
                  <Input
                    id="tracking-number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                  />
                </div>
                <div>
                  <Label htmlFor="courier-service">Courier Service</Label>
                  <Select value={courierService} onValueChange={setCourierService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select courier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhivery">Delhivery</SelectItem>
                      <SelectItem value="bluedart">Blue Dart</SelectItem>
                      <SelectItem value="fedex">FedEx</SelectItem>
                      <SelectItem value="dtdc">DTDC</SelectItem>
                      <SelectItem value="ecom">Ecom Express</SelectItem>
                      <SelectItem value="xpressbees">XpressBees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                onClick={() => onShipOrder(order.id, trackingNumber, courierService)}
                disabled={!trackingNumber || !courierService}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Truck className="h-4 w-4 mr-2" />
                Mark as Shipped
              </Button>
            </div>
          )}

          {order.status === "SHIPPED" && (
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-800 font-medium">Order is shipped and on the way!</p>
                {order.trackingNumber && (
                  <p className="text-blue-600 text-sm">Tracking: {order.trackingNumber}</p>
                )}
              </div>
              <Button 
                onClick={() => onStatusUpdate(order.id, "DELIVERED")}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Delivered
              </Button>
            </div>
          )}

          {order.status === "DELIVERED" && (
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-green-800 font-medium">✅ Order completed successfully!</p>
              <p className="text-green-600 text-sm">Customer can now leave reviews and feedback.</p>
            </div>
          )}

          {order.status === "CANCELLED" && (
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-800 font-medium">❌ Order was cancelled</p>
              <p className="text-red-600 text-sm">Refund process will be initiated if payment was made.</p>
            </div>
          )}

          {/* Manual status update */}
          <div className="border-t pt-3">
            <Label htmlFor="manual-status">Manual Status Update</Label>
            <div className="flex gap-2 mt-2">
              <Select defaultValue={order.status} onValueChange={(value) => onStatusUpdate(order.id, value, notes)}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Admin notes */}
          <div>
            <Label htmlFor="admin-notes">Admin Notes</Label>
            <Textarea
              id="admin-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about this order..."
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {order.notes && (
        <div>
          <h3 className="font-semibold mb-3">Order Notes</h3>
          <p className="text-sm bg-gray-50 p-3 rounded-lg">{order.notes}</p>
        </div>
      )}
    </div>
  )
}

// Quick Ship Dialog Component
interface QuickShipDialogProps {
  order: Order
  onShip: (trackingNumber: string, courier: string) => void
}

function QuickShipDialog({ order, onShip }: QuickShipDialogProps) {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [courierService, setCourierService] = useState("")
  const [open, setOpen] = useState(false)

  const handleShip = () => {
    if (trackingNumber && courierService) {
      onShip(trackingNumber, courierService)
      setOpen(false)
      setTrackingNumber("")
      setCourierService("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Truck className="h-4 w-4 mr-1" />
          Ship
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ship Order #{order.orderNumber}</DialogTitle>
          <DialogDescription>
            Enter tracking information to mark this order as shipped
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="quick-tracking">Tracking Number</Label>
            <Input
              id="quick-tracking"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
            />
          </div>
          <div>
            <Label htmlFor="quick-courier">Courier Service</Label>
            <Select value={courierService} onValueChange={setCourierService}>
              <SelectTrigger>
                <SelectValue placeholder="Select courier service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delhivery">Delhivery</SelectItem>
                <SelectItem value="bluedart">Blue Dart</SelectItem>
                <SelectItem value="fedex">FedEx</SelectItem>
                <SelectItem value="dtdc">DTDC</SelectItem>
                <SelectItem value="ecom">Ecom Express</SelectItem>
                <SelectItem value="xpressbees">XpressBees</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleShip}
              disabled={!trackingNumber || !courierService}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Ship Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
