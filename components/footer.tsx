import Link from "next/link"
import { Leaf, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"></div>
      
      <div className="container py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">TOFA</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Premium organic fruits and essential oils from our sustainable farms in the pristine valleys of Himachal Pradesh.
            </p>
            <div className="flex space-x-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                <Facebook className="h-5 w-5 text-white" />
              </div>
              <div className="p-2 bg-gradient-to-r from-pink-600 to-rose-700 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <div className="p-2 bg-gradient-to-r from-sky-600 to-cyan-700 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                <Twitter className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/products" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 hover:translate-x-2">
                Products
              </Link>
              <Link href="/track-order" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 hover:translate-x-2">
                Track Order
              </Link>
              <Link href="/orders" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 hover:translate-x-2">
                My Orders
              </Link>
              <Link href="/orchard-stay" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 hover:translate-x-2">
                Orchard Stay
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 hover:translate-x-2">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 hover:translate-x-2">
                Contact
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-green-400 transition-colors duration-200 hover:translate-x-2">
                Blog
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Products</h3>
            <div className="space-y-3">
              <Link href="/products?category=fruits" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2">
                Organic Fruits
              </Link>
              <Link href="/products?category=aromatics" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2">
                Essential Oils
              </Link>
              <Link href="/wholesale" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2">
                Wholesale
              </Link>
              <Link href="/retail" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-2">
                Retail
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full group-hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-green-400 transition-colors">Himachal Pradesh, India</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full group-hover:scale-110 transition-transform">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-blue-400 transition-colors">+91 9816711369</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-700 rounded-full group-hover:scale-110 transition-transform">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-purple-400 transition-colors">info@tofa.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 TOFA - Tarasvie Organic Farms & Aromatics. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>for sustainable farming</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
