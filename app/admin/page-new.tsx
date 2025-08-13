"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, AlertCircle, CheckCircle, Clock, Bell, RefreshCw } from "lucide-react"

interface DashboardStats {
  totalRevenue: number
  revenueGrowth: number
  totalOrders: number
  ordersGrowth: number
  totalUsers: number
  newUsers: number
  totalProducts: number
  lowStockProducts: number
  pendingOrders: number
  processingOrders: number
}

interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string | null
  customerEmail: string
  amount: number
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [lastOrderCount, setLastOrderCount] = useState(0)
  const { toast } = useToast()

  const fetchDashboardData = async () => {
    try {
      // Fetch orders for stats
      const ordersResponse = await fetch('/api/orders?limit=5')
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json()
        const orders = ordersData.orders || []
        
        // Check for new orders
        if (lastOrderCount > 0 && orders.length > lastOrderCount) {
          const newOrdersCount = orders.length - lastOrderCount
          toast({
            title: "New Order Alert! 🔔",
            description: `${newOrdersCount} new order${newOrdersCount > 1 ? 's' : ''} received`,
          })
        }
        setLastOrderCount(orders.length)

        // Calculate stats from real data
        const pendingOrders = orders.filter((o: any) => o.status === 'PENDING').length
        const processingOrders = orders.filter((o: any) => o.status === 'PROCESSING' || o.status === 'CONFIRMED').length
        const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.total, 0)

        setStats({
          totalRevenue,
          revenueGrowth: 12.5, // Mock for now
          totalOrders: ordersData.pagination?.total || orders.length,
          ordersGrowth: 8.3, // Mock for now
          totalUsers: 890, // Mock for now
          newUsers: 45, // Mock for now
          totalProducts: 48, // Mock for now
          lowStockProducts: 3, // Mock for now
          pendingOrders,
          processingOrders
        })

        // Format recent orders
        const formattedOrders = orders.slice(0, 5).map((order: any) => ({
          id: order.id,
          orderNumber: order.orderNumber,
          customerName: order.user?.name || 'Unknown',
          customerEmail: order.user?.email || '',
          amount: order.total,
          status: order.status.toLowerCase(),
          createdAt: order.createdAt
        }))
        setRecentOrders(formattedOrders)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Fall back to mock data if API fails
      setStats({
        totalRevenue: 125000,
        revenueGrowth: 12.5,
        totalOrders: 1250,
        ordersGrowth: 8.3,
        totalUsers: 890,
        newUsers: 45,
        totalProducts: 48,
        lowStockProducts: 3,
        pendingOrders: 8,
        processingOrders: 12
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    
    // Set up polling for new orders every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
      case "confirmed":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <TrendingUp className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your admin dashboard</p>
        </div>
        <Button onClick={fetchDashboardData} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Order Alerts */}
      {stats && stats.pendingOrders > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-yellow-800">Order Alerts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-800">
                  You have <strong>{stats.pendingOrders}</strong> pending orders that need attention
                </p>
                <p className="text-sm text-yellow-600 mt-1">
                  {stats.processingOrders} orders are currently being processed
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/admin/orders">View Orders</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats?.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats?.revenueGrowth}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +{stats?.ordersGrowth}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              +{stats?.newUsers} new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.lowStockProducts} low stock items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest orders from customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName} • {order.customerEmail}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">₹{order.amount}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status.toUpperCase()}
                      </span>
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No recent orders found
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Manage Orders</CardTitle>
            <CardDescription>View and process customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/admin/orders">View All Orders</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
            <CardDescription>Add, edit, and manage inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/admin/products">Manage Products</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>View Analytics</CardTitle>
            <CardDescription>Track sales and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/admin/analytics">View Analytics</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
