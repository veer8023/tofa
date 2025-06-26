"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Package, AlertCircle, CheckCircle, Save, X } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  wholesalePrice: number
  stock: number
  minStock: number
  status: string
  image: string
  description: string
  unit: string
}

// Initial mock products
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Organic Apple",
    category: "FRUITS",
    price: 180,
    wholesalePrice: 150,
    stock: 50,
    minStock: 10,
    status: "active",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    description: "Fresh, crisp organic apples from our Himachal orchards",
    unit: "per kg",
  },
  {
    id: "2",
    name: "Organic Pear",
    category: "FRUITS",
    price: 220,
    wholesalePrice: 180,
    stock: 8,
    minStock: 10,
    status: "active",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop",
    description: "Sweet and juicy organic pears",
    unit: "per kg",
  },
  {
    id: "3",
    name: "Lemongrass Essential Oil",
    category: "AROMATICS",
    price: 450,
    wholesalePrice: 380,
    stock: 15,
    minStock: 5,
    status: "active",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    description: "Pure lemongrass essential oil",
    unit: "per 50ml",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "FRUITS",
    price: 0,
    wholesalePrice: 0,
    stock: 0,
    minStock: 5,
    status: "active",
    image: "",
    description: "",
    unit: "per kg",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      category: "FRUITS",
      price: 0,
      wholesalePrice: 0,
      stock: 0,
      minStock: 5,
      status: "active",
      image: "",
      description: "",
      unit: "per kg",
    })
  }

  const handleAddProduct = () => {
    console.log("Add Product button clicked!")
    setShowAddForm(true)
    setEditingProduct(null)
    resetForm()
  }

  const handleSaveProduct = () => {
    if (!formData.name.trim()) {
      alert("Please enter a product name")
      return
    }

    if (formData.price <= 0) {
      alert("Please enter a valid price")
      return
    }

    const newProduct: Product = {
      ...formData,
      id: Date.now().toString(),
    }

    setProducts([...products, newProduct])
    setShowAddForm(false)
    resetForm()
    alert("Product added successfully!")
    console.log("Product added:", newProduct)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setFormData({ ...product })
    setShowAddForm(true)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p,
    )
    setProducts(updatedProducts)
    setShowAddForm(false)
    setEditingProduct(null)
    resetForm()
    alert("Product updated successfully!")
  }

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId))
      alert("Product deleted successfully!")
    }
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingProduct(null)
    resetForm()
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) {
      return { status: "Out of Stock", color: "bg-red-100 text-red-800", icon: AlertCircle }
    } else if (product.stock <= product.minStock) {
      return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle }
    } else {
      return { status: "In Stock", color: "bg-green-100 text-green-800", icon: CheckCircle }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-600">Manage your organic products catalog</p>
        </div>

        <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Add/Edit Product Form */}
      {showAddForm && (
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingProduct ? "Edit Product" : "Add New Product"}
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Organic Mango"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="FRUITS">Fruits</option>
                  <option value="AROMATICS">Aromatics</option>
                  <option value="OILS">Oils</option>
                  <option value="HERBS">Herbs</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Retail Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="250"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wholesalePrice">Wholesale Price (₹)</Label>
                <Input
                  id="wholesalePrice"
                  type="number"
                  value={formData.wholesalePrice}
                  onChange={(e) => setFormData({ ...formData, wholesalePrice: Number(e.target.value) })}
                  placeholder="200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Current Stock *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  placeholder="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minStock">Minimum Stock Alert</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: Number(e.target.value) })}
                  placeholder="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="per kg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="image">Image URL (Optional)</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop"
              />
              <p className="text-sm text-gray-500">
                Try: https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                onClick={editingProduct ? handleUpdateProduct : handleSaveProduct}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingProduct ? "Update Product" : "Save Product"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-sm text-gray-600">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{products.filter((p) => p.status === "active").length}</p>
                <p className="text-sm text-gray-600">Active Products</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{products.filter((p) => p.stock <= p.minStock).length}</p>
                <p className="text-sm text-gray-600">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{products.filter((p) => p.stock === 0).length}</p>
                <p className="text-sm text-gray-600">Out of Stock</p>
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              <option value="FRUITS">Fruits</option>
              <option value="AROMATICS">Aromatics</option>
              <option value="OILS">Oils</option>
              <option value="HERBS">Herbs</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Wholesale</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product)
                const StockIcon = stockStatus.icon

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/placeholder.svg?height=40&width=40"}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.unit}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {product.category.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{product.price}</TableCell>
                    <TableCell>₹{product.wholesalePrice}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{product.stock}</span>
                        <Badge className={stockStatus.color}>
                          <StockIcon className="h-3 w-3 mr-1" />
                          {stockStatus.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          product.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
