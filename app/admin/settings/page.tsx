"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Settings, Bell, Truck, CreditCard, Save } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "TOFA - Tarasv Organic Farms & Aromatics",
    siteDescription: "Premium organic fruits and essential oils from our sustainable farms",
    contactEmail: "info@tofa.com",
    contactPhone: "+91 98765 43210",
    address: "Village Kotgarh, Shimla District, Himachal Pradesh 171201",

    // Notification Settings
    emailNotifications: true,
    orderNotifications: true,
    lowStockAlerts: true,
    newUserAlerts: true,

    // Shipping Settings
    freeShippingThreshold: 500,
    standardShippingCost: 50,
    expressShippingCost: 100,

    // Payment Settings
    codEnabled: true,
    onlinePaymentEnabled: false,
    minimumOrderAmount: 100,

    // Inventory Settings
    lowStockThreshold: 10,
    autoReorderEnabled: false,

    // Business Settings
    gstNumber: "12ABCDE3456F7GH",
    businessHours: "Monday - Saturday: 9:00 AM - 6:00 PM",
  })

  const handleSave = () => {
    // In a real app, save to backend
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    })
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your application settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => updateSetting("siteName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => updateSetting("siteDescription", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateSetting("contactEmail", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) => updateSetting("contactPhone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => updateSetting("address", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive email notifications for important events</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="orderNotifications">Order Notifications</Label>
                <p className="text-sm text-gray-500">Get notified when new orders are placed</p>
              </div>
              <Switch
                id="orderNotifications"
                checked={settings.orderNotifications}
                onCheckedChange={(checked) => updateSetting("orderNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                <p className="text-sm text-gray-500">Alert when products are running low</p>
              </div>
              <Switch
                id="lowStockAlerts"
                checked={settings.lowStockAlerts}
                onCheckedChange={(checked) => updateSetting("lowStockAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newUserAlerts">New User Alerts</Label>
                <p className="text-sm text-gray-500">Notify when new users register</p>
              </div>
              <Switch
                id="newUserAlerts"
                checked={settings.newUserAlerts}
                onCheckedChange={(checked) => updateSetting("newUserAlerts", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span>Shipping Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="freeShippingThreshold">Free Shipping Threshold (₹)</Label>
              <Input
                id="freeShippingThreshold"
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => updateSetting("freeShippingThreshold", Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="standardShippingCost">Standard Shipping Cost (₹)</Label>
              <Input
                id="standardShippingCost"
                type="number"
                value={settings.standardShippingCost}
                onChange={(e) => updateSetting("standardShippingCost", Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expressShippingCost">Express Shipping Cost (₹)</Label>
              <Input
                id="expressShippingCost"
                type="number"
                value={settings.expressShippingCost}
                onChange={(e) => updateSetting("expressShippingCost", Number(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="codEnabled">Cash on Delivery</Label>
                <p className="text-sm text-gray-500">Allow customers to pay on delivery</p>
              </div>
              <Switch
                id="codEnabled"
                checked={settings.codEnabled}
                onCheckedChange={(checked) => updateSetting("codEnabled", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="onlinePaymentEnabled">Online Payments</Label>
                <p className="text-sm text-gray-500">Enable Stripe/Razorpay integration</p>
              </div>
              <Switch
                id="onlinePaymentEnabled"
                checked={settings.onlinePaymentEnabled}
                onCheckedChange={(checked) => updateSetting("onlinePaymentEnabled", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimumOrderAmount">Minimum Order Amount (₹)</Label>
              <Input
                id="minimumOrderAmount"
                type="number"
                value={settings.minimumOrderAmount}
                onChange={(e) => updateSetting("minimumOrderAmount", Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input
                id="gstNumber"
                value={settings.gstNumber}
                onChange={(e) => updateSetting("gstNumber", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Save Changes</h3>
              <p className="text-sm text-gray-500">Make sure to save your changes before leaving this page.</p>
            </div>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
