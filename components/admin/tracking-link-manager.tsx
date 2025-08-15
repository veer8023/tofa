"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Send,
  Copy,
  Share2,
  Mail,
  MessageSquare,
  ExternalLink,
  QrCode,
  Download
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface Order {
  id: string
  orderNumber: string
  userId: string
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  trackingNumber: string | null
  shippingName: string
  shippingPhone: string
  user: {
    id: string
    name: string | null
    email: string
  }
  total: number
  createdAt: string
}

interface TrackingLinkManagerProps {
  order: Order
  onOrderUpdate: (orderId: string, updates: Partial<Order>) => void
}

export default function TrackingLinkManager({ order, onOrderUpdate }: TrackingLinkManagerProps) {
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '')
  const [courier, setCourier] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isSendingNotification, setIsSendingNotification] = useState(false)
  const [customMessage, setCustomMessage] = useState('')
  const { toast } = useToast()

  const trackingUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://tarasvie.vu'}/track-order?tracking=${trackingNumber}`

  const generateQRCode = async () => {
    // Generate QR code for tracking URL
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(trackingUrl)}`
    
    // Download QR code
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = `tracking-qr-${order.orderNumber}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "QR Code Downloaded",
      description: "Tracking QR code has been downloaded.",
    })
  }

  const updateTrackingNumber = async () => {
    if (!trackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking number.",
        variant: "destructive"
      })
      return
    }

    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/orders/${order.id}/tracking`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          trackingNumber: trackingNumber.trim(),
          courier,
          status: 'shipped'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update tracking number')
      }

      const updatedOrder = await response.json()
      onOrderUpdate(order.id, { 
        trackingNumber: trackingNumber.trim(),
        status: 'shipped'
      })

      toast({
        title: "Tracking Updated",
        description: `Tracking number ${trackingNumber} has been added to order #${order.orderNumber}.`,
      })
    } catch (error) {
      console.error('Error updating tracking:', error)
      toast({
        title: "Update Failed",
        description: "Failed to update tracking number. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const sendTrackingNotification = async (method: 'email' | 'sms') => {
    if (!trackingNumber) {
      toast({
        title: "Error",
        description: "No tracking number available.",
        variant: "destructive"
      })
      return
    }

    setIsSendingNotification(true)
    try {
      const response = await fetch(`/api/admin/orders/${order.id}/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method,
          trackingNumber,
          trackingUrl,
          customMessage: customMessage.trim() || undefined
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to send ${method} notification`)
      }

      toast({
        title: "Notification Sent",
        description: `Tracking information sent via ${method} to ${method === 'email' ? order.user.email : order.shippingPhone}.`,
      })
    } catch (error) {
      console.error(`Error sending ${method} notification:`, error)
      toast({
        title: "Notification Failed",
        description: `Failed to send ${method} notification. Please try again.`,
        variant: "destructive"
      })
    } finally {
      setIsSendingNotification(false)
    }
  }

  const copyTrackingLink = () => {
    navigator.clipboard.writeText(trackingUrl)
    toast({
      title: "Link Copied",
      description: "Tracking link copied to clipboard.",
    })
  }

  const shareTrackingLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Track Order #${order.orderNumber}`,
          text: `Track your order from Tarasvie`,
          url: trackingUrl,
        })
      } catch (err) {
        // Fallback to clipboard if share fails
        copyTrackingLink()
      }
    } else {
      copyTrackingLink()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Truck className="h-4 w-4 mr-2" />
          Manage Tracking
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tracking Management - Order #{order.orderNumber}</DialogTitle>
          <DialogDescription>
            Manage tracking information and send notifications to customer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label className="text-sm font-medium">Customer</Label>
              <div className="text-sm">{order.shippingName}</div>
              <div className="text-sm text-muted-foreground">{order.user.email}</div>
            </div>
            <div>
              <Label className="text-sm font-medium">Phone</Label>
              <div className="text-sm">{order.shippingPhone}</div>
            </div>
          </div>

          {/* Tracking Number Input */}
          <div className="space-y-3">
            <Label htmlFor="trackingNumber">Tracking Number</Label>
            <div className="flex gap-2">
              <Input
                id="trackingNumber"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="flex-1"
              />
              <Select value={courier} onValueChange={setCourier}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Courier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhivery">Delhivery</SelectItem>
                  <SelectItem value="bluedart">Blue Dart</SelectItem>
                  <SelectItem value="dtdc">DTDC</SelectItem>
                  <SelectItem value="fedex">FedEx</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={updateTrackingNumber}
              disabled={isUpdating || !trackingNumber.trim()}
              className="w-full"
            >
              {isUpdating ? "Updating..." : "Update Tracking & Mark as Shipped"}
            </Button>
          </div>

          {/* Current Tracking Info */}
          {trackingNumber && (
            <div className="space-y-3">
              <Label>Tracking Link</Label>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-mono break-all mb-2">{trackingUrl}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyTrackingLink}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareTrackingLink}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={generateQRCode}>
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={trackingUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Customer Notifications */}
          <div className="space-y-4">
            <Label>Send Tracking Information</Label>
            
            {/* Custom Message */}
            <div className="space-y-2">
              <Label htmlFor="customMessage" className="text-sm">Custom Message (Optional)</Label>
              <Textarea
                id="customMessage"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Add a personal message to the customer..."
                className="min-h-[80px]"
              />
            </div>

            {/* Notification Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => sendTrackingNotification('email')}
                disabled={isSendingNotification || !trackingNumber}
                className="h-auto p-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <div className="text-sm">
                    <div className="font-medium">Send Email</div>
                    <div className="text-xs text-muted-foreground">
                      to {order.user.email}
                    </div>
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => sendTrackingNotification('sms')}
                disabled={isSendingNotification || !trackingNumber}
                className="h-auto p-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <div className="text-sm">
                    <div className="font-medium">Send SMS</div>
                    <div className="text-xs text-muted-foreground">
                      to {order.shippingPhone}
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Real-time Tracking Preview */}
          {trackingNumber && (
            <div className="space-y-2">
              <Label>Customer Experience Preview</Label>
              <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Real-time Package Tracking</div>
                    <div className="text-sm text-muted-foreground">
                      Customer can track on Delhivery, Blue Dart, DTDC & FedEx websites
                    </div>
                  </div>
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  Live updates • GPS tracking • Delivery estimates
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
