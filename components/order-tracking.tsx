import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  ExternalLink,
  Copy,
  RefreshCw,
  AlertCircle,
  Smartphone
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { TrackingEvent, TrackingInfo } from '@/types/tracking'

interface OrderTrackingProps {
  orderId: string
  trackingNumber: string
  courierService?: string
  currentStatus: string
  estimatedDelivery?: string
}

export default function OrderTracking({ 
  orderId, 
  trackingNumber, 
  courierService = "delhivery",
  currentStatus,
  estimatedDelivery 
}: OrderTrackingProps) {
  const [trackingData, setTrackingData] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)
  const { toast } = useToast()

  const fetchTrackingInfo = async (forceRefresh = false) => {
    if (!trackingNumber) return

    setLoading(true)
    setError(null)

    try {
      // Fetch real-time tracking from courier service
      const response = await fetch(
        `/api/orders/track/courier?trackingNumber=${encodeURIComponent(trackingNumber)}&courierService=${courierService}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch tracking information')
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.message || 'Tracking information not available')
      }

      const courierData = result.data
      
      const transformedData: TrackingInfo = {
        trackingNumber: courierData.trackingNumber,
        courierService: courierData.courierService,
        currentStatus: courierData.status,
        estimatedDelivery: courierData.estimatedDelivery,
        events: courierData.events,
        lastUpdated: new Date().toISOString(),
        deliveryUrl: courierData.deliveryUrl
      }

      setTrackingData(transformedData)
      setLastRefreshed(new Date())
      
      if (forceRefresh) {
        toast({
          title: "Tracking Updated",
          description: "Latest tracking information has been fetched.",
        })
      }

    } catch (err: any) {
      console.error('Tracking fetch error:', err)
      setError(err.message || 'Failed to fetch tracking information')
      
      // Fallback to mock data for demo purposes
      setTrackingData(getMockTrackingData())
      
      toast({
        title: "Using Demo Data",
        description: "Live tracking temporarily unavailable. Showing demo data.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const getMockTrackingData = (): TrackingInfo => {
    return {
      trackingNumber,
      courierService,
      currentStatus,
      estimatedDelivery: estimatedDelivery || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      events: [
        {
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Order Placed',
          location: 'Online',
          description: 'Order has been placed and confirmed'
        },
        {
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Processing',
          location: 'Warehouse - Mumbai',
          description: 'Order is being prepared for shipment'
        },
        {
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Shipped',
          location: 'Mumbai Hub',
          description: 'Package has been dispatched'
        },
        {
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          status: 'In Transit',
          location: 'Delhi Hub',
          description: 'Package is on the way to destination'
        }
      ],
      lastUpdated: new Date().toISOString(),
      deliveryUrl: getTrackingUrl(trackingNumber, courierService)
    }
  }

  const getTrackingUrl = (trackingNumber: string, service: string): string => {
    const urls: Record<string, string> = {
      delhivery: `https://www.delhivery.com/track/package/${trackingNumber}`,
      bluedart: `https://www.bluedart.com/tracking?trackingNumber=${trackingNumber}`,
      dtdc: `https://www.dtdc.in/tracking.asp?strCnno=${trackingNumber}`,
      fedex: `https://www.fedex.com/fedextrack/?tracknum=${trackingNumber}`,
      indiapost: `https://www.indiapost.gov.in/vas/Pages/trackconsignment.aspx?TrackId=${trackingNumber}`,
      ecom: `https://ecomexpress.in/tracking/?ecmid=${trackingNumber}`,
      xpressbees: `https://www.xpressbees.com/track?shipment=${trackingNumber}`
    }
    return urls[service.toLowerCase()] || '#'
  }

  // Auto-fetch tracking info on component mount
  useEffect(() => {
    fetchTrackingInfo()
  }, [trackingNumber, currentStatus])

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(trackingNumber)
    toast({
      title: "Copied!",
      description: "Tracking number copied to clipboard",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "order placed":
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
      case "in transit":
        return "bg-purple-100 text-purple-800"
      case "out for delivery":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCourierTrackingUrl = (service: string, trackingNumber: string) => {
    const urls: Record<string, string> = {
      delhivery: `https://www.delhivery.com/track/package/${trackingNumber}`,
      bluedart: `https://www.bluedart.com/tracking/${trackingNumber}`,
      fedex: `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
      dtdc: `https://www.dtdc.in/tracking/tracking_results.asp?Ttype=awb_no&strCnno=${trackingNumber}`,
      ecom: `https://ecomexpress.in/tracking/?awb=${trackingNumber}`,
      xpressbees: `https://www.xpressbees.com/package-tracking?awb=${trackingNumber}`
    }
    return urls[service.toLowerCase()] || `https://google.com/search?q=track+${trackingNumber}`
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Loading tracking information...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => fetchTrackingInfo(true)} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Package Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tracking Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Tracking Number</p>
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium">{trackingNumber}</span>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={copyTrackingNumber}
                className="h-6 w-6 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Courier Service</p>
            <p className="font-medium capitalize">{courierService}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Status</p>
            <Badge className={getStatusColor(currentStatus)}>
              {currentStatus}
            </Badge>
          </div>
        </div>

        {/* Estimated Delivery */}
        {estimatedDelivery && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Estimated Delivery: {new Date(estimatedDelivery).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        {/* Tracking Timeline */}
        {trackingData && (
          <div className="space-y-4">
            <h4 className="font-semibold">Tracking History</h4>
            <div className="space-y-4">
              {trackingData.events.map((event, index) => (
                <div key={index} className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      index === 0 ? 'bg-green-500 border-green-500' : 'bg-gray-300 border-gray-300'
                    }`} />
                    {index < trackingData.events.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-300 mt-2" />
                    )}
                  </div>
                  
                  {/* Event details */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.timestamp).toLocaleDateString()} at{' '}
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    {event.location && (
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{event.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button 
            onClick={() => fetchTrackingInfo(true)}
            variant="outline"
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button 
            onClick={() => window.open(getCourierTrackingUrl(courierService, trackingNumber), '_blank')}
            variant="outline"
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Track on {courierService} Website
          </Button>
        </div>

        {/* Last Updated */}
        {trackingData?.lastUpdated && (
          <p className="text-xs text-gray-500 text-center">
            Last updated: {new Date(trackingData.lastUpdated).toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
