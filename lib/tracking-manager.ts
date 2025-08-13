import { courierTrackingService } from './courier-tracking'
import { TrackingStatus } from '@/types/tracking'

export interface TrackingUpdateParams {
  orderId: string
  trackingNumber: string
  courierService: string
  status?: TrackingStatus
}

export interface BulkTrackingParams {
  orders: Array<{
    orderId: string
    trackingNumber: string
    courierService: string
  }>
}

// Utility class for managing order tracking
export class TrackingManager {
  
  // Get tracking information for a single order
  static async getTrackingInfo(trackingNumber: string, courierService: string) {
    try {
      const trackingData = await courierTrackingService.trackPackage(
        trackingNumber, 
        courierService
      )
      return {
        success: true,
        data: trackingData
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Update tracking information in database
  static async updateOrderTracking({ orderId, trackingNumber, courierService, status }: TrackingUpdateParams) {
    try {
      // In a real application, you would update the database here
      // For now, we'll simulate the update
      console.log(`Updating tracking for order ${orderId}:`, {
        trackingNumber,
        courierService,
        status
      })

      return {
        success: true,
        message: 'Tracking information updated successfully'
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Track multiple orders at once
  static async bulkTrackOrders({ orders }: BulkTrackingParams) {
    try {
      const trackingPromises = orders.map(async (order) => {
        try {
          const trackingData = await courierTrackingService.trackPackage(
            order.trackingNumber,
            order.courierService
          )
          return {
            orderId: order.orderId,
            success: true,
            data: trackingData
          }
        } catch (error: any) {
          return {
            orderId: order.orderId,
            success: false,
            error: error.message
          }
        }
      })

      const results = await Promise.all(trackingPromises)
      
      return {
        success: true,
        data: results
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get delivery status from courier service
  static async checkDeliveryStatus(trackingNumber: string, courierService: string) {
    try {
      const trackingData = await courierTrackingService.trackPackage(
        trackingNumber,
        courierService
      )

      const isDelivered = trackingData.status.toLowerCase().includes('delivered')
      const lastEvent = trackingData.events[trackingData.events.length - 1]

      return {
        success: true,
        isDelivered,
        currentStatus: trackingData.status,
        lastUpdate: lastEvent?.timestamp,
        estimatedDelivery: trackingData.estimatedDelivery
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Generate tracking URL for external courier website
  static getTrackingUrl(trackingNumber: string, courierService: string): string {
    const urls: Record<string, string> = {
      delhivery: `https://www.delhivery.com/track/package/${trackingNumber}`,
      bluedart: `https://www.bluedart.com/tracking?trackingNumber=${trackingNumber}`,
      dtdc: `https://www.dtdc.in/tracking.asp?strCnno=${trackingNumber}`,
      fedex: `https://www.fedex.com/fedextrack/?tracknum=${trackingNumber}`,
      indiapost: `https://www.indiapost.gov.in/vas/Pages/trackconsignment.aspx?TrackId=${trackingNumber}`,
      ecom: `https://ecomexpress.in/tracking/?ecmid=${trackingNumber}`,
      xpressbees: `https://www.xpressbees.com/track?shipment=${trackingNumber}`
    }

    return urls[courierService.toLowerCase()] || '#'
  }

  // Validate tracking number format
  static validateTrackingNumber(trackingNumber: string, courierService: string): boolean {
    const patterns: Record<string, RegExp> = {
      delhivery: /^\d{10,15}$/,
      bluedart: /^BD\d{8,12}$/i,
      dtdc: /^\d{10,15}$/,
      fedex: /^\d{12,14}$/,
      indiapost: /^[A-Z]{2}\d{9}[A-Z]{2}$/i
    }

    const pattern = patterns[courierService.toLowerCase()]
    if (!pattern) return true // If no pattern defined, assume valid

    return pattern.test(trackingNumber)
  }

  // Get supported courier services
  static getSupportedCouriers() {
    return courierTrackingService.getSupportedCouriers()
  }
}

// Convenience functions
export const trackPackage = TrackingManager.getTrackingInfo
export const updateTracking = TrackingManager.updateOrderTracking
export const bulkTrack = TrackingManager.bulkTrackOrders
export const checkDelivery = TrackingManager.checkDeliveryStatus
export const getTrackingUrl = TrackingManager.getTrackingUrl
export const validateTracking = TrackingManager.validateTrackingNumber
export const getSupportedCouriers = TrackingManager.getSupportedCouriers
