import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/providers"

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800'], 
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "TOFA - Tarasvie Organic Farms & Aromatics",
  description: "Premium organic fruits and essential oils from our sustainable farms",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
