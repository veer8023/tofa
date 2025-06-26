"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "retailer" | "wholesaler" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, role: User["role"]) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    try {
      const storedUser = localStorage.getItem("tofa_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Error loading stored user:", error)
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check for admin credentials
      if (email === "admin@tofa.com" && password === "admin123") {
        const adminUser: User = {
          id: "admin",
          name: "Admin User",
          email: "admin@tofa.com",
          role: "admin",
        }
        setUser(adminUser)
        localStorage.setItem("tofa_user", JSON.stringify(adminUser))
        return true
      }

      // Check for other test users
      if (email === "customer@example.com" && password === "password123") {
        const customerUser: User = {
          id: "customer1",
          name: "Test Customer",
          email: "customer@example.com",
          role: "customer",
        }
        setUser(customerUser)
        localStorage.setItem("tofa_user", JSON.stringify(customerUser))
        return true
      }

      // Mock user data for any other email
      const mockUser: User = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email,
        role: "customer",
      }

      setUser(mockUser)
      localStorage.setItem("tofa_user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string, role: User["role"]): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
      }

      setUser(newUser)
      localStorage.setItem("tofa_user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("tofa_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
