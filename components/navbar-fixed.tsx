"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User, LogIn } from "lucide-react"
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
    <header className="w-full flex justify-center mt-6">
      <nav className="flex items-center gap-8 px-8 py-3 rounded-2xl bg-white/90 shadow-lg backdrop-blur border border-green-100 max-w-4xl w-full mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
          <Image 
            src="/tarasvie-logo.svg" 
            alt="TARASVIE Logo" 
            width={140} 
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Enhanced Cart */}
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
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-green-600 text-white text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-green-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {!user && (
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
