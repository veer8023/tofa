"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, DollarSign, Package, Users, ShoppingCart, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const salesData = {
    totalRevenue: 125000,
    revenueGrowth: 12.5,
    totalOrders: 156,
    ordersGrowth: 8.3,
    avgOrderValue: 801,
    avgOrderGrowth: 4.2,
    newCustomers: 45,
    customerGrowth: 15.7,
  }

  const topProducts = [
    { name: "Organic Apple", sales: 45, revenue: 8100 },
    { name: "Lemongrass Essential Oil", sales: 32, revenue: 11200 },
    { name: "Organic Pear", sales: 28, revenue: 6160 },
    { name: "Organic Blueberry", sales: 15, revenue: 6750 },
    { name: "Apricot Oil", sales: 12, revenue: 5040 },
  ]

  const recentActivity = [
    { type: "order", message: "New order #TOFA1234567890 placed", time: "2 minutes ago" },
    { type: "user", message: "New customer registered: Priya Sharma", time: "15 minutes ago" },
    { type: "product", message: "Low stock alert: Organic Blueberry", time: "1 hour ago" },
    { type: "order", message: "Order #TOFA1234567889 shipped", time: "2 hours ago" },
    { type: "user", message: "Wholesale account approved: Green Store", time: "3 hours ago" },
  ]

  const monthlyData = [
    { month: "Jan", revenue: 85000, orders: 120 },
    { month: "Feb", revenue: 92000, orders: 135 },
    { month: "Mar", revenue: 78000, orders: 110 },
    { month: "Apr", revenue: 105000, orders: 145 },
    { month: "May", revenue: 125000, orders: 156 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{salesData.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{salesData.revenueGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.totalOrders}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{salesData.ordersGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{salesData.avgOrderValue}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{salesData.avgOrderGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.newCustomers}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />+{salesData.customerGrowth}% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Package className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
                    <Badge variant="outline">#{index + 1}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "order"
                        ? "bg-blue-100"
                        : activity.type === "user"
                          ? "bg-green-100"
                          : "bg-yellow-100"
                    }`}
                  >
                    {activity.type === "order" && <ShoppingCart className="h-4 w-4 text-blue-600" />}
                    {activity.type === "user" && <Users className="h-4 w-4 text-green-600" />}
                    {activity.type === "product" && <Package className="h-4 w-4 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{month.month} 2024</p>
                    <p className="text-sm text-gray-500">{month.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">₹{month.revenue.toLocaleString()}</p>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(month.revenue / 125000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
