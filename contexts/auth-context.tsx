"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

interface User {
  id: string
  name: string
  email: string
  role: "CUSTOMER" | "RETAILER" | "WHOLESALER" | "ADMIN"
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
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(status === "loading")
  }, [status])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      return result?.ok || false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string, role: User["role"]): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      })
      
      if (response.ok) {
        // Auto-login after successful registration
        return await login(email, password)
      }
      return false
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    signOut({ callbackUrl: "/" })
  }

  // Convert session to User format
  const user: User | null = session?.user ? {
    id: session.user.id || "",
    name: session.user.name || "",
    email: session.user.email || "",
    role: (session.user.role as User["role"]) || "CUSTOMER",
  } : null

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
