import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TrackingLinkManager from "@/components/admin/tracking-link-manager"
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
  Send,
  ExternalLink
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
  shippingName: string
  shippingPhone: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingPincode: string
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
      return <Clock className="h-4 w-4 text-orange-500" />
    case "CONFIRMED":
    case "PROCESSING":
      return <Package className="h-4 w-4 text-blue-500" />
    case "SHIPPED":
      return <Truck className="h-4 w-4 text-purple-500" />
    case "DELIVERED":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "CANCELLED":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    default:
      return <Package className="h-4 w-4 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "CONFIRMED":
    case "PROCESSING":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "SHIPPED":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "DELIVERED":
      return "bg-green-100 text-green-800 border-green-200"
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatAddress = (order: Order) => {
  return `${order.shippingAddress}, ${order.shippingCity}, ${order.shippingState} - ${order.shippingPincode}`
}

export default function AdminOrdersPageEnhanced() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { toast } = useToast()

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        search: searchTerm,
        status: statusFilter === "ALL" ? "" : statusFilter
      })

      const response = await fetch(`/api/admin/orders?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }

      const data: OrderResponse = await response.json()
      setOrders(data.orders)
      setTotalPages(data.pagination.pages)
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [currentPage, searchTerm, statusFilter])

  const handleOrderUpdate = (orderId: string, updates: Partial<Order>) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, ...updates }
          : order
      )
    )
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update order status')
      }

      handleOrderUpdate(orderId, { status: newStatus as any })
      toast({
        title: "Status Updated",
        description: `Order status updated to ${newStatus.toLowerCase()}.`,
      })
    } catch (error) {
      console.error('Error updating order status:', error)
      toast({
        title: "Update Failed",
        description: "Failed to update order status. Please try again.",
        variant: "destructive"
      })
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingPhone.includes(searchTerm)

    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[50vh]">
          <RefreshCw className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Order Management</h1>
        <p className="text-muted-foreground">
          Manage orders, tracking, and customer notifications
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by order number, email, name, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <Button onClick={fetchOrders} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Orders ({filteredOrders.length})</span>
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "ALL" 
                  ? "Try adjusting your search or filter criteria." 
                  : "No orders have been placed yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Tracking</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium">#{order.orderNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="font-medium">{order.shippingName}</div>
                        <div className="text-sm text-muted-foreground">{order.user.email}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {order.shippingPhone}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <Badge variant="outline" className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="mt-1">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="text-xs border rounded px-2 py-1"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="PROCESSING">Processing</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="font-semibold">₹{order.total}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.paymentMethod} • {order.paymentStatus}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="text-sm">{formatDate(order.createdAt)}</div>
                      </TableCell>
                      
                      <TableCell>
                        {order.trackingNumber ? (
                          <div className="space-y-1">
                            <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                              {order.trackingNumber}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="h-6 text-xs"
                            >
                              <a 
                                href={`${process.env.NEXT_PUBLIC_APP_URL || 'https://tarasvie.vu'}/track-order?tracking=${order.trackingNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View
                              </a>
                            </Button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not assigned</span>
                        )}
                      </TableCell>
                      
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <TrackingLinkManager 
                            order={order} 
                            onOrderUpdate={handleOrderUpdate}
                          />
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
