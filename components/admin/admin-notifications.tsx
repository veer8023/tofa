"use client"

import { useState, useEffect } from "react"
import { Bell, Package, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface AdminNotification {
  id: string
  type: string
  title: string
  message: string
  customerName: string
  customerEmail: string
  orderNumber: string
  total: number
  itemCount: number
  status: string
  paymentMethod: string
  createdAt: string
  isRead: boolean
  actionUrl: string
}

interface AdminNotificationsProps {
  className?: string
}

export function AdminNotifications({ className }: AdminNotificationsProps) {
  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [lastCheck, setLastCheck] = useState<string>(new Date().toISOString())
  const { toast } = useToast()
  const router = useRouter()

  // Fetch notifications
  const fetchNotifications = async (since?: string) => {
    try {
      const url = since 
        ? `/api/admin/notifications?limit=20&since=${encodeURIComponent(since)}`
        : `/api/admin/notifications?limit=20`
      
      const response = await fetch(url)
      
      if (response.ok) {
        const data = await response.json()
        
        if (since && data.notifications.length > 0) {
          // New notifications detected - show toast and update state
          const newNotifications = data.notifications
          setNotifications(prev => [...newNotifications, ...prev])
          setUnreadCount(prev => prev + newNotifications.length)
          
          // Show toast for new orders
          newNotifications.forEach((notification: AdminNotification) => {
            toast({
              title: "🎉 New Order Received!",
              description: `Order #${notification.orderNumber} from ${notification.customerName} - ₹${notification.total}`,
              duration: 5000,
            })
          })
        } else if (!since) {
          // Initial load
          setNotifications(data.notifications)
          setUnreadCount(data.notifications.length)
        }
        
        setLastCheck(data.timestamp)
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    }
  }

  // Initial load
  useEffect(() => {
    fetchNotifications()
  }, [])

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications(lastCheck)
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [lastCheck])

  // Handle notification click
  const handleNotificationClick = (notification: AdminNotification) => {
    // Mark as read (visually)
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
    
    // Navigate to order
    router.push(notification.actionUrl)
    setIsOpen(false)
  }

  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([])
    setUnreadCount(0)
    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared.",
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={`relative ${className}`}>
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearAll}
              className="h-6 px-2 text-xs"
            >
              Clear all
            </Button>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled className="py-4">
            <div className="text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No new notifications</p>
            </div>
          </DropdownMenuItem>
        ) : (
          notifications.slice(0, 10).map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`p-3 cursor-pointer hover:bg-muted/50 ${
                !notification.isRead ? 'bg-muted/20' : ''
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start space-x-3 w-full">
                <div className="mt-1">
                  <Package className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">
                      {notification.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary" className="text-xs">
                      ₹{notification.total}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {notification.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          ))
        )}
        
        {notifications.length > 10 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-center text-sm text-muted-foreground"
              onClick={() => router.push('/admin/orders')}
            >
              <Eye className="h-4 w-4 mr-2" />
              View all orders
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
