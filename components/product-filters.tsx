"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFiltersProps {
  filters: {
    category: string
    priceRange: string
    orderType: string
    availability: string
  }
  onFiltersChange: (filters: any) => void
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Type</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.orderType} onValueChange={(value) => updateFilter("orderType", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="retail" id="retail" />
              <Label htmlFor="retail">Retail</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="wholesale" id="wholesale" />
              <Label htmlFor="wholesale">Wholesale</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="aromatics">Aromatics</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.priceRange} onValueChange={(value) => updateFilter("priceRange", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-100">₹0 - ₹100</SelectItem>
              <SelectItem value="100-200">₹100 - ₹200</SelectItem>
              <SelectItem value="200-300">₹200 - ₹300</SelectItem>
              <SelectItem value="300-500">₹300 - ₹500</SelectItem>
              <SelectItem value="500-1000">₹500+</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.availability} onValueChange={(value) => updateFilter("availability", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="limited">Limited Stock</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
