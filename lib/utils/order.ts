export function generateOrderNumber(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `TOFA${timestamp.slice(-6)}${random}`
}

export function generateTrackingNumber(): string {
  const random = Math.random().toString(36).substring(2, 12).toUpperCase()
  return `TRK${random}`
}
