import Link from "next/link"
import { Leaf, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">TOFA</span>
            </div>
            <p className="text-green-100">
              Premium organic fruits and essential oils from our sustainable farms in Himachal Pradesh.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-green-300" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-green-300" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-green-300" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/products" className="block text-green-100 hover:text-white">
                Products
              </Link>
              <Link href="/orchard-stay" className="block text-green-100 hover:text-white">
                Orchard Stay
              </Link>
              <Link href="/about" className="block text-green-100 hover:text-white">
                About Us
              </Link>
              <Link href="/blog" className="block text-green-100 hover:text-white">
                Blog
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <div className="space-y-2">
              <Link href="/products?category=fruits" className="block text-green-100 hover:text-white">
                Organic Fruits
              </Link>
              <Link href="/products?category=aromatics" className="block text-green-100 hover:text-white">
                Essential Oils
              </Link>
              <Link href="/wholesale" className="block text-green-100 hover:text-white">
                Wholesale
              </Link>
              <Link href="/retail" className="block text-green-100 hover:text-white">
                Retail
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-green-100">Himachal Pradesh, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-green-100">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-green-100">info@tofa.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-100">
          <p>&copy; 2024 TOFA - Tarasv Organic Farms & Aromatics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
