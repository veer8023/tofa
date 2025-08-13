"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, User, LogIn, Leaf } from "lucide-react"
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
    { href: "/orchard-stay", label: "Stay" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <header className="w-full flex justify-center mt-6 px-4">
      <nav className="relative flex items-center gap-8 px-8 py-4 rounded-3xl bg-gradient-to-r from-white/95 via-green-50/80 to-white/95 shadow-2xl backdrop-blur-xl border-2 border-green-100/50 max-w-5xl w-full mx-auto hover:shadow-green-200/50 transition-all duration-500 hover:scale-[1.02]">
        
        {/* Animated background glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/10 via-emerald-400/5 to-green-400/10 animate-pulse"></div>
        
        {/* Logo with Enhanced Typography */}
        <Link href="/" className="relative flex items-center gap-3 font-bold text-green-700 text-2xl group hover:scale-105 transition-all duration-300">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 animate-pulse opacity-30"></div>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 shadow-lg group-hover:shadow-xl group-hover:shadow-green-400/30 transition-all duration-300">
              <Leaf className="h-7 w-7 text-white drop-shadow-sm" />
            </div>
          </div>
          <span className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 bg-clip-text text-transparent group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-300 font-semibold tracking-tight">
            Tarasvie
          </span>
        </Link>

        {/* Desktop Navigation with Enhanced Typography */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-base font-medium text-gray-700 hover:text-green-600 transition-all duration-300 rounded-xl hover:bg-green-50/80 hover:shadow-md hover:scale-105 group tracking-wide"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="relative z-10 font-medium">{item.label}</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300"></div>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Clean & Modern Cart */}
          <Link href="/cart" className="group relative">
            <div className="flex items-center gap-3 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-green-300">
              
              <div className="relative">
                <ShoppingCart className="h-5 w-5 transition-colors duration-300" />
                {itemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {itemCount}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 group-hover:text-green-600 transition-colors duration-300">Cart</span>
                <span className="text-sm font-semibold">₹{totalValue.toFixed(2)}</span>
              </div>
            </div>
          </Link>

          {/* Enhanced User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-green-300 cursor-pointer">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-xs text-gray-500">Welcome back</span>
                    <span className="text-sm font-semibold truncate max-w-20">
                      {user.name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border-green-100 shadow-xl">
                <DropdownMenuLabel className="font-semibold text-green-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{user.name || 'User'}</div>
                      <div className="text-xs text-gray-500 font-normal">{user.email}</div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-green-100" />
                <DropdownMenuItem asChild className="hover:bg-green-50 focus:bg-green-50">
                  <Link href="/orders" className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center">
                      📦
                    </div>
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="hover:bg-green-50 focus:bg-green-50">
                  <Link href="/profile" className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-100 rounded flex items-center justify-center">
                      👤
                    </div>
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                {user.role === 'ADMIN' && (
                  <DropdownMenuItem asChild className="hover:bg-orange-50 focus:bg-orange-50">
                    <Link href="/admin" className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-100 rounded flex items-center justify-center">
                        ⚡
                      </div>
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-green-100" />
                <DropdownMenuItem 
                  onClick={logout} 
                  className="text-red-600 hover:bg-red-50 focus:bg-red-50 font-medium"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 rounded flex items-center justify-center">
                      🚪
                    </div>
                    Sign Out
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login" className="group relative">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-400/30 transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <LogIn className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Login</span>
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          {/* Clean Mobile Cart */}
          <Link href="/cart" className="group relative">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-green-300">
              
              <div className="relative">
                <ShoppingCart className="h-5 w-5 transition-colors duration-300" />
                
                {itemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                    {itemCount}
                  </div>
                )}
              </div>
            </div>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg hover:shadow-xl hover:shadow-gray-400/30 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Menu className="h-5 w-5" />
              </div>
            </SheetTrigger>
            <SheetContent className="bg-gradient-to-b from-white via-green-50/30 to-white">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-lg font-medium text-gray-700 hover:text-green-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-green-50/80 hover:shadow-md hover:scale-105 group"
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-all duration-300"></div>
                  </Link>
                ))}
                
                {!user && (
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <div className="w-full mt-6 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Login
                    </div>
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
