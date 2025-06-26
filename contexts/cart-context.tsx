"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category: "fruits" | "aromatics"
  orderType: "retail" | "wholesale"
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
  addItem: (item: Omit<CartItem, "quantity" | "id">) => Promise<void>
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
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, loading: false })

  const fetchCart = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await fetch("/api/cart")
      if (response.ok) {
        const cartItems = await response.json()
        const formattedItems = cartItems.map((item: any) => ({
          id: item.id,
          productId: item.productId,
          name: item.product.name,
          price: item.orderType === "WHOLESALE" ? item.product.wholesalePrice : item.product.price,
          image: item.product.image,
          quantity: item.quantity,
          category: item.product.category.toLowerCase(),
          orderType: item.orderType.toLowerCase(),
        }))
        dispatch({ type: "SET_ITEMS", payload: formattedItems })
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error)
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const addItem = async (item: Omit<CartItem, "quantity" | "id">) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.productId,
          quantity: 1,
          orderType: item.orderType,
        }),
      })

      if (response.ok) {
        await fetchCart()
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error)
    }
  }

  const removeItem = async (id: string) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        dispatch({ type: "REMOVE_ITEM", payload: id })
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeItem(id)
        return
      }

      const response = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      })

      if (response.ok) {
        dispatch({ type: "UPDATE_ITEM", payload: { id, quantity } })
      }
    } catch (error) {
      console.error("Failed to update cart item:", error)
    }
  }

  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      })

      if (response.ok) {
        dispatch({ type: "CLEAR_CART" })
      }
    } catch (error) {
      console.error("Failed to clear cart:", error)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

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
