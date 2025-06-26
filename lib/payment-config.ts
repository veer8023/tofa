// Server-side payment configuration
// This file should only be used in server components or API routes

export function getPaymentConfig() {
  return {
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID,
      keySecret: process.env.RAZORPAY_KEY_SECRET,
    },
  }
}

// Function to get public payment keys (when payment integration is implemented)
export function getPublicPaymentKeys() {
  // These would be set when payment integration is actually implemented
  // For now, return empty to avoid exposing sensitive data
  return {
    stripe: {
      publishableKey: "", // Will be set when Stripe integration is added
    },
    razorpay: {
      keyId: "", // Will be set when Razorpay integration is added
    },
  }
}
