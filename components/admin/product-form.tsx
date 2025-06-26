"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFormData {
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

interface ProductFormProps {
  initialData?: any
  onSubmit: (data: ProductFormData) => void
  onCancel?: () => void
}

export function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    category: initialData?.category || "FRUITS",
    price: initialData?.price || 0,
    wholesalePrice: initialData?.wholesalePrice || 0,
    stock: initialData?.stock || 0,
    minStock: initialData?.minStock || 5,
    status: initialData?.status || "active",
    image: initialData?.image || "",
    description: initialData?.description || "",
    unit: initialData?.unit || "per kg",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert("Please enter a product name")
      return
    }

    if (formData.price <= 0) {
      alert("Please enter a valid price")
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      alert("Product saved successfully!")
    } catch (error) {
      alert("Error saving product. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{initialData ? "Edit Product" : "Add New Product"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Organic Apple"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FRUITS">Fruits</SelectItem>
                <SelectItem value="AROMATICS">Aromatics</SelectItem>
                <SelectItem value="OILS">Oils</SelectItem>
                <SelectItem value="HERBS">Herbs</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Retail Price (₹) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              placeholder="150"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wholesalePrice">Wholesale Price (₹)</Label>
            <Input
              id="wholesalePrice"
              type="number"
              value={formData.wholesalePrice}
              onChange={(e) => handleChange("wholesalePrice", Number(e.target.value))}
              placeholder="120"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Current Stock *</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => handleChange("stock", Number(e.target.value))}
              placeholder="50"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minStock">Minimum Stock Alert</Label>
            <Input
              id="minStock"
              type="number"
              value={formData.minStock}
              onChange={(e) => handleChange("minStock", Number(e.target.value))}
              placeholder="10"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Input
              id="unit"
              value={formData.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
              placeholder="per kg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL (Optional)</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => handleChange("image", e.target.value)}
            placeholder="https://example.com/image.jpg or leave empty"
          />
          <p className="text-sm text-gray-500">Tip: Upload to imgur.com and paste the direct image link here</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe your product..."
            rows={3}
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}
