"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category: "FRUITS" | "AROMATICS"
  orderType: "RETAIL" | "WHOLESALE"
  productId: string
}

interface CartState {
  items: CartItem[]
  total: number
  loading: boolean
}

type CartAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_ITEM"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  items: CartItem[]
  total: number
  loading: boolean
  addItem: (productId: string, quantity?: number) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  fetchCart: () => Promise<void>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ITEMS": {
      const items = action.payload
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      return { ...state, items, total }
    }
    case "ADD_ITEM": {
      const newItems = [...state.items, action.payload]
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }
    case "UPDATE_ITEM": {
      const updatedItems = state.items
        .map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item))
        .filter((item) => item.quantity > 0)
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    }
    case "CLEAR_CART":
      return { ...state, items: [], total: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, loading: false })

  const fetchCart = async () => {
    if (!user?.id) return
    
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const response = await fetch(`/api/cart?userId=${user.id}`)
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: "SET_ITEMS", payload: data.items })
      } else {
        console.error("Failed to fetch cart:", response.statusText)
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const addItem = async (productId: string, quantity: number = 1) => {
    try {
      if (!user?.id) throw new Error("No user ID found")
      
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId,
          quantity,
          orderType: "RETAIL"
        }),
      })

      if (response.ok) {
        await fetchCart() // Refresh cart after adding item
      } else {
        const errorData = await response.json()
        console.error("Failed to add item to cart:", errorData)
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error)
    }
  }

  const removeItem = async (id: string) => {
    try {
      if (!user?.id) throw new Error("No user ID found")
      
      const response = await fetch(`/api/cart?userId=${user.id}&itemId=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        dispatch({ type: "REMOVE_ITEM", payload: id })
      } else {
        console.error("Failed to remove item from cart:", response.statusText)
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      if (!user?.id) throw new Error("No user ID found")
      
      // Find the item to get productId
      const item = state.items.find(item => item.id === id)
      if (!item) {
        console.error("Item not found in cart")
        return
      }

      if (quantity <= 0) {
        await removeItem(id)
        return
      }

      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          userId: user.id,
          productId: item.productId,
          quantity 
        }),
      })

      if (response.ok) {
        dispatch({ type: "UPDATE_ITEM", payload: { id, quantity } })
      } else {
        console.error("Failed to update cart item:", response.statusText)
      }
    } catch (error) {
      console.error("Failed to update cart item:", error)
    }
  }

  const clearCart = async () => {
    try {
      if (!user?.id) throw new Error("No user ID found")
      
      const response = await fetch(`/api/cart?userId=${user.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        dispatch({ type: "CLEAR_CART" })
      } else {
        console.error("Failed to clear cart:", response.statusText)
      }
    } catch (error) {
      console.error("Failed to clear cart:", error)
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchCart()
    }
  }, [user?.id])

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        loading: state.loading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
