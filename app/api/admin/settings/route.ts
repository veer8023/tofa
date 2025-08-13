import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { log } from "@/lib/logger"

// GET all settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const settings = await prisma.settings.findMany()
    
    // Convert array of settings to object format for easier frontend usage
    const settingsObject = settings.reduce((acc, setting) => {
      let value: any = setting.value
      
      // Parse value based on type
      switch (setting.type) {
        case 'NUMBER':
          value = Number(setting.value)
          break
        case 'BOOLEAN':
          value = setting.value === 'true'
          break
        case 'JSON':
          try {
            value = JSON.parse(setting.value)
          } catch {
            value = setting.value
          }
          break
        default:
          value = setting.value
      }
      
      acc[setting.key] = value
      return acc
    }, {} as Record<string, any>)

    log.userAction(session.user.id, 'settings_fetched', { count: settings.length })

    return NextResponse.json({ settings: settingsObject })

  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    )
  }
}

// PUT (bulk update settings)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { settings } = body

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { error: "Invalid settings data" },
        { status: 400 }
      )
    }

    // Update or create settings
    const operations = []
    
    for (const [key, value] of Object.entries(settings)) {
      let settingValue: string
      let settingType: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON' = 'STRING'
      
      // Determine type and convert value
      if (typeof value === 'number') {
        settingType = 'NUMBER'
        settingValue = value.toString()
      } else if (typeof value === 'boolean') {
        settingType = 'BOOLEAN'
        settingValue = value.toString()
      } else if (typeof value === 'object' && value !== null) {
        settingType = 'JSON'
        settingValue = JSON.stringify(value)
      } else {
        settingType = 'STRING'
        settingValue = String(value)
      }

      operations.push(
        prisma.settings.upsert({
          where: { key },
          update: {
            value: settingValue,
            type: settingType
          },
          create: {
            key,
            value: settingValue,
            type: settingType
          }
        })
      )
    }

    await Promise.all(operations)

    log.userAction(session.user.id, 'settings_updated', { 
      keys: Object.keys(settings),
      count: Object.keys(settings).length
    })

    return NextResponse.json({ 
      success: true,
      message: "Settings updated successfully" 
    })

  } catch (error) {
    console.error("Error updating settings:", error)
    const session = await getServerSession(authOptions)
    log.authError(session?.user?.id || 'unknown', 'settings_update_failed', `${error}`)
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    )
  }
}

// POST (create single setting)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { key, value, type = 'STRING' } = body

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 }
      )
    }

    let settingValue: string
    
    // Convert value to string based on type
    if (type === 'JSON') {
      settingValue = JSON.stringify(value)
    } else {
      settingValue = String(value)
    }

    const setting = await prisma.settings.create({
      data: {
        key,
        value: settingValue,
        type: type as any
      }
    })

    log.userAction(session.user.id, 'setting_created', { key, type })

    return NextResponse.json({ 
      success: true,
      setting 
    })

  } catch (error) {
    console.error("Error creating setting:", error)
    const session = await getServerSession(authOptions)
    log.authError(session?.user?.id || 'unknown', 'setting_creation_failed', `${error}`)
    return NextResponse.json(
      { error: "Failed to create setting" },
      { status: 500 }
    )
  }
}
