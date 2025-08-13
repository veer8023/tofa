import { NextRequest, NextResponse } from "next/server"
import { checkDatabaseConnection } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now()
    
    // Check database connection
    const dbConnected = await checkDatabaseConnection()
    
    const responseTime = Date.now() - startTime
    
    const healthStatus = {
      status: dbConnected ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: `${responseTime}ms`,
      database: {
        connected: dbConnected,
        status: dbConnected ? 'connected' : 'disconnected'
      },
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0'
    }
    
    const statusCode = dbConnected ? 200 : 503
    
    return NextResponse.json(healthStatus, { status: statusCode })
    
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      database: {
        connected: false,
        status: 'error'
      }
    }, { status: 503 })
  }
} 