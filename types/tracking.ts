export interface TrackingEvent {
  timestamp: string
  status: string
  location: string
  description: string
}

export interface TrackingInfo {
  trackingNumber: string
  courierService: string
  currentStatus: string
  estimatedDelivery?: string
  events: TrackingEvent[]
  lastUpdated: string
  deliveryUrl?: string
}

export interface CourierService {
  id: string
  name: string
  supported: boolean
  apiEndpoint?: string
  trackingUrlTemplate?: string
}

export interface PackageTrackingData {
  orderId: string
  orderNumber: string
  trackingNumber: string
  courierService: string
  status: string
  estimatedDelivery?: string
  actualDelivery?: string
  recipientName?: string
  recipientAddress?: string
  trackingEvents: TrackingEvent[]
  deliveryUrl?: string
  lastUpdated: string
}

export interface TrackingApiResponse {
  success: boolean
  data?: PackageTrackingData
  error?: string
  message?: string
}

export type TrackingStatus = 
  | 'order_placed'
  | 'processing'
  | 'shipped'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'failed_delivery'
  | 'returned'
  | 'cancelled'

export interface TrackingStatusConfig {
  label: string
  description: string
  icon: string
  color: string
  bgColor: string
}
