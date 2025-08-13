import { NextRequest, NextResponse } from 'next/server'
import { courierTrackingService } from '@/lib/courier-tracking'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const trackingNumber = searchParams.get('trackingNumber')
    const courierService = searchParams.get('courierService') || 'delhivery'

    if (!trackingNumber) {
      return NextResponse.json(
        { error: 'Tracking number is required' },
        { status: 400 }
      )
    }

    // Get real-time tracking data from courier service
    const trackingData = await courierTrackingService.trackPackage(
      trackingNumber,
      courierService
    )

    return NextResponse.json({
      success: true,
      data: trackingData
    })

  } catch (error: any) {
    console.error('Courier tracking error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch tracking information',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { trackingNumbers, courierService = 'delhivery' } = body

    if (!trackingNumbers || !Array.isArray(trackingNumbers)) {
      return NextResponse.json(
        { error: 'trackingNumbers array is required' },
        { status: 400 }
      )
    }

    // Track multiple packages
    const trackingPromises = trackingNumbers.map(trackingNumber =>
      courierTrackingService.trackPackage(trackingNumber, courierService)
        .catch(error => ({
          trackingNumber,
          error: error.message
        }))
    )

    const results = await Promise.all(trackingPromises)

    return NextResponse.json({
      success: true,
      data: results
    })

  } catch (error: any) {
    console.error('Bulk tracking error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch tracking information',
        message: error.message 
      },
      { status: 500 }
    )
  }
}
