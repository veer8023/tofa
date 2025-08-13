import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { log } from "@/lib/logger"

// GET single setting
export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const setting = await prisma.settings.findUnique({
      where: { key: params.key }
    })

    if (!setting) {
      return NextResponse.json(
        { error: "Setting not found" },
        { status: 404 }
      )
    }

    // Parse value based on type
    let value: any = setting.value
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

    return NextResponse.json({
      key: setting.key,
      value,
      type: setting.type
    })

  } catch (error) {
    console.error("Error fetching setting:", error)
    return NextResponse.json(
      { error: "Failed to fetch setting" },
      { status: 500 }
    )
  }
}

// PUT single setting
export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { value, type = 'STRING' } = body

    if (value === undefined) {
      return NextResponse.json(
        { error: "Value is required" },
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

    const setting = await prisma.settings.upsert({
      where: { key: params.key },
      update: {
        value: settingValue,
        type: type as any
      },
      create: {
        key: params.key,
        value: settingValue,
        type: type as any
      }
    })

    log.userAction(session.user.id, 'setting_updated', { 
      key: params.key, 
      type, 
      action: 'upsert' 
    })

    return NextResponse.json({ 
      success: true,
      setting: {
        key: setting.key,
        value: type === 'JSON' ? JSON.parse(setting.value) : 
               type === 'NUMBER' ? Number(setting.value) :
               type === 'BOOLEAN' ? setting.value === 'true' :
               setting.value,
        type: setting.type
      }
    })

  } catch (error) {
    console.error("Error updating setting:", error)
    const session = await getServerSession(authOptions)
    log.authError(session?.user?.id || 'unknown', 'setting_update_failed', `${error}`)
    return NextResponse.json(
      { error: "Failed to update setting" },
      { status: 500 }
    )
  }
}

// DELETE single setting
export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.settings.delete({
      where: { key: params.key }
    })

    log.userAction(session.user.id, 'setting_deleted', { key: params.key })

    return NextResponse.json({ 
      success: true,
      message: "Setting deleted successfully"
    })

  } catch (error) {
    console.error("Error deleting setting:", error)
    const session = await getServerSession(authOptions)
    log.authError(session?.user?.id || 'unknown', 'setting_deletion_failed', `${error}`)
    return NextResponse.json(
      { error: "Failed to delete setting" },
      { status: 500 }
    )
  }
}
