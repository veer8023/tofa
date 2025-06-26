"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Users, TrendingUp, DollarSign, AlertCircle, CheckCircle, Clock } from "lucide-react"

// Mock data that always works
const mockDashboardData = {
  stats: {
    totalRevenue: 125000,
    revenueGrowth: 12.5,
    totalOrders: 1250,
    ordersGrowth: 8.3,
    totalUsers: 890,
    newUsers: 45,
    totalProducts: 48,
    lowStockProducts: 3,
  },
  recentOrders: [
    {
      id: "TOFA1234567890",
      customerName: "Priya Sharma",
      amount: 1250,
      status: "processing",
      date: "2024-01-25",
    },
    {
      id: "TOFA1234567891",
      customerName: "Rajesh Kumar",
      amount: 850,
      status: "shipped",
      date: "2024-01-25",
    },
    {
      id: "TOFA1234567892",
      customerName: "Meera Patel",
      amount: 1500,
      status: "delivered",
      date: "2024-01-24",
    },
    {
      id: "TOFA1234567893",
      customerName: "Amit Singh",
      amount: 750,
      status: "processing",
      date: "2024-01-24",
    },
  ],
  lowStockProducts: [
    { name: "Organic Blueberry", stock: 5, minStock: 10 },
    { name: "Lemongrass Essential Oil", stock: 3, minStock: 8 },
    { name: "Organic Persimmon", stock: 7, minStock: 15 },
  ],
}

export default function AdminDashboard() {
  const [data, setData] = useState(mockDashboardData)
  const [loading, setLoading] = useState(false)

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />
      case "shipped":
        return <Package className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your organic farm business.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{data.stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{data.stats.revenueGrowth}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+{data.stats.ordersGrowth}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+{data.stats.newUsers} new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">{data.stats.lowStockProducts} low stock</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold">₹{order.amount}</p>
                    <Badge className={getStatusColor(order.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Low Stock Alert</span>
            </CardTitle>
            <CardDescription>Products that need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.lowStockProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg border-orange-200 bg-orange-50"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      Current: {product.stock} | Minimum: {product.minStock}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-orange-500 text-orange-700">
                    Low Stock
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Package className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-medium">Add New Product</h3>
              <p className="text-sm text-gray-600">Add a new organic product to your catalog</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <ShoppingCart className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium">Process Orders</h3>
              <p className="text-sm text-gray-600">Review and process pending orders</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
              <h3 className="font-medium">View Analytics</h3>
              <p className="text-sm text-gray-600">Check sales performance and trends</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
