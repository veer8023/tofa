"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users, UserCheck, UserX, Crown, Store } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "retailer" | "wholesaler" | "admin"
  status: "active" | "inactive"
  joinDate: string
  lastLogin: string
  totalOrders: number
  totalSpent: number
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "customer",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-25",
      totalOrders: 5,
      totalSpent: 2500,
    },
    {
      id: "2",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      role: "retailer",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-01-24",
      totalOrders: 12,
      totalSpent: 15000,
    },
    {
      id: "3",
      name: "Organic Store Delhi",
      email: "store@example.com",
      role: "wholesaler",
      status: "active",
      joinDate: "2024-01-05",
      lastLogin: "2024-01-23",
      totalOrders: 25,
      totalSpent: 45000,
    },
    {
      id: "4",
      name: "Meera Patel",
      email: "meera@example.com",
      role: "customer",
      status: "inactive",
      joinDate: "2024-01-20",
      lastLogin: "2024-01-22",
      totalOrders: 2,
      totalSpent: 800,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "wholesaler":
        return "bg-blue-100 text-blue-800"
      case "retailer":
        return "bg-green-100 text-green-800"
      case "customer":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />
      case "wholesaler":
        return <Store className="h-4 w-4" />
      case "retailer":
        return <Store className="h-4 w-4" />
      case "customer":
        return <Users className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const updateUserStatus = (userId: string, newStatus: User["status"]) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  const userStats = {
    total: users.length,
    customers: users.filter((u) => u.role === "customer").length,
    retailers: users.filter((u) => u.role === "retailer").length,
    wholesalers: users.filter((u) => u.role === "wholesaler").length,
    active: users.filter((u) => u.status === "active").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600">Manage customer accounts and user roles</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{userStats.total}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-gray-600" />
              <div>
                <p className="text-2xl font-bold">{userStats.customers}</p>
                <p className="text-sm text-gray-600">Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{userStats.retailers}</p>
                <p className="text-sm text-gray-600">Retailers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{userStats.wholesalers}</p>
                <p className="text-sm text-gray-600">Wholesalers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{userStats.active}</p>
                <p className="text-sm text-gray-600">Active Users</p>
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
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="retailer">Retailer</SelectItem>
                <SelectItem value="wholesaler">Wholesaler</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      <div className="flex items-center space-x-1">
                        {getRoleIcon(user.role)}
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {user.status === "active" ? (
                        <UserCheck className="h-3 w-3 mr-1" />
                      ) : (
                        <UserX className="h-3 w-3 mr-1" />
                      )}
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>{user.totalOrders}</TableCell>
                  <TableCell className="font-semibold">₹{user.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <Select
                      value={user.status}
                      onValueChange={(value: User["status"]) => updateUserStatus(user.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
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
