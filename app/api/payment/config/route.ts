import { NextResponse } from "next/server"

export async function GET() {
  // This endpoint will be used when payment integration is implemented
  // For now, return empty configuration to avoid exposing sensitive data

  return NextResponse.json({
    stripe: {
      publishableKey: "", // Will be populated when Stripe is integrated
    },
    razorpay: {
      keyId: "", // Will be populated when Razorpay is integrated
    },
    paymentMethods: ["cod"], // Currently only COD is supported
  })
}
