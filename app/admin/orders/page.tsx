"use client"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: "cod" | "online"
  paymentStatus: "pending" | "paid" | "failed"
  shippingAddress: {
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    pincode: string
    phone: string
  }
  orderDate: string
  trackingNumber?: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "TOFA1234567890",
      customerName: "Priya Sharma",
      customerEmail: "priya@example.com",
      customerPhone: "+91 98765 43210",
      items: [
        { name: "Organic Apple", quantity: 2, price: 180 },
        { name: "Lemongrass Essential Oil", quantity: 1, price: 350 },
      ],
      total: 1250,
      status: "processing",
      paymentMethod: "cod",
      paymentStatus: "pending",
      shippingAddress: {
        fullName: "Priya Sharma",
        addressLine1: "123 Main Street",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
        phone: "+91 98765 43210",
      },
      orderDate: "2024-01-25",
      trackingNumber: "TRK1234567890",
    },
    {
      id: "TOFA1234567891",
      customerName: "Rajesh Kumar",
      customerEmail: "rajesh@example.com",
      customerPhone: "+91 98765 43211",
      items: [{ name: "Organic Pear", quantity: 3, price: 220 }],
      total: 850,
      status: "shipped",
      paymentMethod: "online",
      paymentStatus: "paid",
      shippingAddress: {
        fullName: "Rajesh Kumar",
        addressLine1: "456 Garden Road",
        city: "Chandigarh",
        state: "Chandigarh",
        pincode: "160001",
        phone: "+91 98765 43211",
      },
      orderDate: "2024-01-24",
      trackingNumber: "TRK1234567891",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800"
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
              <AlertCircle className="h-8 w-8 text-gray-600" />
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
              <Clock className="h-8 w-8 text-yellow-600" />
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
              <Truck className="h-8 w-8 text-blue-600" />
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
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders by ID, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell className="font-semibold">₹{order.total}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="outline" className="capitalize">
                        {order.paymentMethod}
                      </Badge>
                      <Badge
                        className={
                          order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : order.paymentStatus === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {order.paymentStatus}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                            <DialogDescription>Order #{order.id}</DialogDescription>
                          </DialogHeader>
                          {selectedOrder && <OrderDetails order={selectedOrder} onStatusUpdate={updateOrderStatus} />}
                        </DialogContent>
                      </Dialog>

                      <Select
                        value={order.status}
                        onValueChange={(value: Order["status"]) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function OrderDetails({
  order,
  onStatusUpdate,
}: { order: Order; onStatusUpdate: (id: string, status: Order["status"]) => void }) {
  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <div>
        <h3 className="font-semibold mb-3">Customer Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">{order.customerName}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{order.customerEmail}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-medium">{order.customerPhone}</p>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h3 className="font-semibold mb-3">Shipping Address</h3>
        <div className="text-sm">
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.addressLine1}</p>
          {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
          </p>
          <p>{order.shippingAddress.phone}</p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h3 className="font-semibold mb-3">Order Items</h3>
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 border-t mt-3">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg">₹{order.total}</span>
        </div>
      </div>

      {/* Order Status */}
      <div>
        <h3 className="font-semibold mb-3">Update Status</h3>
        <Select value={order.status} onValueChange={(value: Order["status"]) => onStatusUpdate(order.id, value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {order.trackingNumber && (
        <div>
          <h3 className="font-semibold mb-3">Tracking Information</h3>
          <p className="text-sm">
            <span className="text-gray-600">Tracking Number: </span>
            <span className="font-mono">{order.trackingNumber}</span>
          </p>
        </div>
      )}
    </div>
  )
}
