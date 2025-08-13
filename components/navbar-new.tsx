"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Menu, ShoppingCart, User, Leaf, LogIn, Search, Heart, Phone, MapPin, Clock } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()
  const { user, logout } = useAuth()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/orchard-stay", label: "Orchard Stay" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-800 text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Free delivery in Delhi NCR</span>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Mon-Sat: 9AM-7PM</span>
            </div>
          </div>
          <div className="text-center">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-semibold">
              🌿 100% Organic & Certified Fresh
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
              <Image 
                src="/tarasvie-logo.svg" 
                alt="TARASVIE Logo" 
                width={120} 
                height={48}
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 hover:scale-105"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2 min-w-[200px]">
              <Search className="h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search products..." 
                className="border-0 bg-transparent focus:ring-0 focus:border-0 text-sm"
              />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1 hover:bg-pink-50 hover:text-pink-600">
                <Heart className="h-5 w-5" />
                <span className="text-sm">Wishlist</span>
              </Button>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative flex items-center space-x-2 hover:bg-green-50 hover:text-green-600">
                  <ShoppingCart className="h-5 w-5" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500">Cart</span>
                    <span className="text-sm font-semibold">₹{totalValue.toFixed(2)}</span>
                  </div>
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs animate-pulse">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <span className="hidden md:block text-sm">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {user.role === 'ADMIN' && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login">
                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-6 mt-6">
                    {/* Mobile Search */}
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Search products..." 
                        className="border-0 bg-transparent focus:ring-0 focus:border-0"
                      />
                    </div>
                    
                    {/* Mobile Navigation */}
                    <div className="flex flex-col space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-gray-700 hover:text-green-600 font-medium py-2 px-4 rounded-lg hover:bg-green-50 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex flex-col space-y-3 pt-4 border-t">
                      <Button variant="outline" className="w-full justify-start">
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Cart ({itemCount} items)
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
