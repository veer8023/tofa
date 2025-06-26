"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Smartphone, Building, Truck } from "lucide-react"

interface ShippingAddress {
  fullName: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pincode: string
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("cod")
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [loading, setLoading] = useState(false)

  const shippingCost = 50
  const tax = Math.round(total * 0.18) // 18% GST
  const finalTotal = total + shippingCost + tax

  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/checkout")
      return
    }
    if (items.length === 0) {
      router.push("/cart")
      return
    }
  }, [user, items, router])

  const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }))
  }

  const validateAddress = () => {
    const required = ["fullName", "phone", "addressLine1", "city", "state", "pincode"]
    return required.every((field) => shippingAddress[field as keyof ShippingAddress].trim() !== "")
  }

  const handlePlaceOrder = async () => {
    if (!validateAddress()) {
      toast({
        title: "Incomplete Address",
        description: "Please fill in all required address fields.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Simulate order creation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const orderId = `TOFA${Date.now()}`

      if (paymentMethod === "cod") {
        toast({
          title: "Order Placed Successfully!",
          description: `Your order ${orderId} has been placed. You'll pay ₹${finalTotal} on delivery.`,
        })
      } else {
        toast({
          title: "Order Placed Successfully!",
          description: `Your order ${orderId} has been placed. Payment processing will be available soon.`,
        })
      }

      clearCart()
      router.push(`/order-confirmation?orderId=${orderId}`)
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user || items.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-green-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Forms */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-600" />
                <span>Shipping Address</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={shippingAddress.fullName}
                    onChange={(e) => handleAddressChange("fullName", e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => handleAddressChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine1">Address Line 1 *</Label>
                <Input
                  id="addressLine1"
                  value={shippingAddress.addressLine1}
                  onChange={(e) => handleAddressChange("addressLine1", e.target.value)}
                  placeholder="House number, street name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  value={shippingAddress.addressLine2}
                  onChange={(e) => handleAddressChange("addressLine2", e.target.value)}
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleAddressChange("city", e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={shippingAddress.state}
                    onChange={(e) => handleAddressChange("state", e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={shippingAddress.pincode}
                    onChange={(e) => handleAddressChange("pincode", e.target.value)}
                    placeholder="Pincode"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                <span>Payment Method</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center space-x-2 cursor-pointer">
                    <Building className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-500">Pay when you receive your order</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                  <RadioGroupItem value="online" id="online" disabled />
                  <Label htmlFor="online" className="flex items-center space-x-2 cursor-not-allowed">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-400">Online Payment</div>
                      <div className="text-sm text-gray-400">
                        Coming Soon - Secure payment gateway integration in progress
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "online" && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Online Payment Integration Coming Soon!</strong>
                    <br />
                    We're working on integrating secure payment gateways including Stripe and Razorpay for your
                    convenience.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        Qty: {item.quantity} × ₹{item.price}
                      </div>
                    </div>
                    <div className="font-medium">₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shippingCost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <div className="pt-4">
                <Button
                  onClick={handlePlaceOrder}
                  disabled={loading || !validateAddress()}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Placing Order..." : `Place Order - ₹${finalTotal}`}
                </Button>

                {!validateAddress() && (
                  <div className="text-center text-sm text-gray-500 mt-2">
                    Please complete the shipping address to place your order
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
