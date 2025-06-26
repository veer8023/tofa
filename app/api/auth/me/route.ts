import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get("auth-user")

    if (!authCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = JSON.parse(authCookie.value)
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }
}
