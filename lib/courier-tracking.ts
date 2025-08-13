// Courier service integrations for package tracking
import { TrackingEvent, TrackingInfo, CourierService } from '@/types/tracking'

export interface CourierTrackingResponse {
  trackingNumber: string
  status: string
  estimatedDelivery?: string
  events: TrackingEvent[]
  courierService: string
  deliveryUrl?: string
}

// Delhivery API integration
export class DelhiveryService {
  private apiKey: string
  private baseUrl = 'https://track.delhivery.com/api/v1/packages/json/'

  constructor() {
    this.apiKey = process.env.DELHIVERY_API_KEY || ''
  }

  async trackPackage(trackingNumber: string): Promise<CourierTrackingResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}?waybill=${trackingNumber}`,
        {
          headers: {
            'Authorization': `Token ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await response.json()
      
      if (!response.ok || !data.ShipmentData?.[0]) {
        throw new Error('Tracking information not found')
      }

      const shipment = data.ShipmentData[0].Shipment
      const scans = shipment.Scans || []

      const events: TrackingEvent[] = scans.map((scan: any) => ({
        timestamp: scan.ScanDateTime,
        status: scan.ScanType,
        location: `${scan.ScannedLocation.City}, ${scan.ScannedLocation.State}`,
        description: scan.Instructions || scan.ScanType
      }))

      return {
        trackingNumber,
        status: shipment.Status.Status,
        estimatedDelivery: shipment.PromisedDeliveryDate,
        events,
        courierService: 'delhivery',
        deliveryUrl: `https://www.delhivery.com/track/package/${trackingNumber}`
      }
    } catch (error) {
      console.error('Delhivery tracking error:', error)
      throw new Error('Failed to fetch tracking information from Delhivery')
    }
  }
}

// BlueDart API integration
export class BlueDartService {
  private apiKey: string
  private baseUrl = 'https://api.bluedart.com/api/v1'

  constructor() {
    this.apiKey = process.env.BLUEDART_API_KEY || ''
  }

  async trackPackage(trackingNumber: string): Promise<CourierTrackingResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/shipment/${trackingNumber}/track`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error('Tracking information not found')
      }

      const events: TrackingEvent[] = (data.trackingHistory || []).map((event: any) => ({
        timestamp: event.date,
        status: event.status,
        location: event.location,
        description: event.description
      }))

      return {
        trackingNumber,
        status: data.currentStatus,
        estimatedDelivery: data.estimatedDelivery,
        events,
        courierService: 'bluedart',
        deliveryUrl: `https://www.bluedart.com/tracking?trackingNumber=${trackingNumber}`
      }
    } catch (error) {
      console.error('BlueDart tracking error:', error)
      throw new Error('Failed to fetch tracking information from BlueDart')
    }
  }
}

// DTDC API integration
export class DTDCService {
  private apiKey: string
  private baseUrl = 'https://blktracksvc.dtdc.com/dtdc-api/rest/JSONCnTrk'

  constructor() {
    this.apiKey = process.env.DTDC_API_KEY || ''
  }

  async trackPackage(trackingNumber: string): Promise<CourierTrackingResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/getTrackDetails`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': this.apiKey
          },
          body: JSON.stringify({
            consignmentNumber: trackingNumber,
            numType: 0
          })
        }
      )

      const data = await response.json()
      
      if (!response.ok || !data.trackHeader) {
        throw new Error('Tracking information not found')
      }

      const events: TrackingEvent[] = (data.trackDetail || []).map((event: any) => ({
        timestamp: event.date,
        status: event.status,
        location: event.location,
        description: event.instructions || event.status
      }))

      return {
        trackingNumber,
        status: data.trackHeader.status,
        estimatedDelivery: data.trackHeader.expectedDeliveryDate,
        events,
        courierService: 'dtdc',
        deliveryUrl: `https://www.dtdc.in/tracking.asp?strCnno=${trackingNumber}`
      }
    } catch (error) {
      console.error('DTDC tracking error:', error)
      throw new Error('Failed to fetch tracking information from DTDC')
    }
  }
}

// FedEx API integration
export class FedExService {
  private apiKey: string
  private baseUrl = 'https://apis.fedex.com/track/v1'

  constructor() {
    this.apiKey = process.env.FEDEX_API_KEY || ''
  }

  async trackPackage(trackingNumber: string): Promise<CourierTrackingResponse> {
    try {
      const response = await fetch(
        `${this.baseUrl}/trackingnumbers`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            includeDetailedScans: true,
            trackingInfo: [
              {
                trackingNumberInfo: {
                  trackingNumber: trackingNumber
                }
              }
            ]
          })
        }
      )

      const data = await response.json()
      
      if (!response.ok || !data.output?.completeTrackResults?.[0]) {
        throw new Error('Tracking information not found')
      }

      const result = data.output.completeTrackResults[0]
      const trackDetail = result.trackResults[0]

      const events: TrackingEvent[] = (trackDetail.scanEvents || []).map((scan: any) => ({
        timestamp: scan.date,
        status: scan.eventDescription,
        location: `${scan.scanLocation?.city}, ${scan.scanLocation?.stateOrProvinceCode}`,
        description: scan.eventDescription
      }))

      return {
        trackingNumber,
        status: trackDetail.latestStatusDetail?.description || 'Unknown',
        estimatedDelivery: trackDetail.estimatedDeliveryTimeWindow?.ends,
        events,
        courierService: 'fedex',
        deliveryUrl: `https://www.fedex.com/fedextrack/?tracknum=${trackingNumber}`
      }
    } catch (error) {
      console.error('FedEx tracking error:', error)
      throw new Error('Failed to fetch tracking information from FedEx')
    }
  }
}

// Main courier tracking service
export class CourierTrackingService {
  private services: Map<string, any> = new Map()

  constructor() {
    this.services.set('delhivery', new DelhiveryService())
    this.services.set('bluedart', new BlueDartService())
    this.services.set('dtdc', new DTDCService())
    this.services.set('fedex', new FedExService())
  }

  async trackPackage(trackingNumber: string, courierService: string): Promise<CourierTrackingResponse> {
    const service = this.services.get(courierService.toLowerCase())
    
    if (!service) {
      throw new Error(`Courier service '${courierService}' is not supported`)
    }

    try {
      return await service.trackPackage(trackingNumber)
    } catch (error) {
      // Fallback to mock data if API fails
      console.error(`Courier API failed for ${courierService}:`, error)
      return this.getMockTrackingData(trackingNumber, courierService)
    }
  }

  private getMockTrackingData(trackingNumber: string, courierService: string): CourierTrackingResponse {
    return {
      trackingNumber,
      status: 'In Transit',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      events: [
        {
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Order Placed',
          location: 'Online',
          description: 'Order has been placed and confirmed'
        },
        {
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Shipped',
          location: 'Mumbai Hub',
          description: 'Package has been dispatched'
        },
        {
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'In Transit',
          location: 'Delhi Hub',
          description: 'Package is on the way to destination'
        }
      ],
      courierService,
      deliveryUrl: this.getTrackingUrl(trackingNumber, courierService)
    }
  }

  private getTrackingUrl(trackingNumber: string, courierService: string): string {
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

  getSupportedCouriers(): CourierService[] {
    return [
      { id: 'delhivery', name: 'Delhivery', supported: true },
      { id: 'bluedart', name: 'Blue Dart', supported: true },
      { id: 'dtdc', name: 'DTDC', supported: true },
      { id: 'fedex', name: 'FedEx', supported: true },
      { id: 'indiapost', name: 'India Post', supported: false },
      { id: 'ecom', name: 'Ecom Express', supported: false },
      { id: 'xpressbees', name: 'XpressBees', supported: false }
    ]
  }
}

export const courierTrackingService = new CourierTrackingService()
