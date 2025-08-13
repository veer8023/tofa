"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CheckCircle, 
  Star, 
  RotateCcw, 
  MessageSquare, 
  Camera, 
  AlertCircle,
  Package,
  Heart,
  ShoppingCart,
  HelpCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderActionsProps {
  order: {
    id: string
    orderNumber: string
    status: string
    items: Array<{
      id: string
      name: string
      quantity: number
      price: number
      image?: string
    }>
    total: number
    createdAt: string
  }
}

type ActionType = 'review' | 'return' | 'support' | 'reorder' | null

export function PostDeliveryActions({ order }: OrderActionsProps) {
  const [selectedAction, setSelectedAction] = useState<ActionType>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const isDelivered = order.status.toLowerCase() === 'delivered'
  const canReview = isDelivered
  const canReturn = isDelivered // Could add time limit logic here
  const canReorder = true

  if (!isDelivered) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6 text-center">
          <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Order In Progress</h3>
          <p className="text-gray-600 mb-4">
            Your order is currently {order.status.toLowerCase()}. 
            Post-delivery actions will be available once your order is delivered.
          </p>
          <Badge className="bg-blue-100 text-blue-800">
            {order.status}
          </Badge>
        </CardContent>
      </Card>
    )
  }

  const ActionCard = ({ 
    icon: Icon, 
    title, 
    description, 
    actionType, 
    color = "gray",
    disabled = false 
  }: {
    icon: any
    title: string
    description: string
    actionType: ActionType
    color?: string
    disabled?: boolean
  }) => (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        selectedAction === actionType ? 'ring-2 ring-green-500' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && setSelectedAction(actionType)}
    >
      <CardContent className="p-4 text-center">
        <Icon className={`h-8 w-8 mx-auto mb-2 text-${color}-600`} />
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )

  const renderActionForm = () => {
    switch (selectedAction) {
      case 'review':
        return <ReviewForm order={order} onSubmit={handleReviewSubmit} />
      case 'return':
        return <ReturnForm order={order} onSubmit={handleReturnSubmit} />
      case 'support':
        return <SupportForm order={order} onSubmit={handleSupportSubmit} />
      case 'reorder':
        return <ReorderForm order={order} onSubmit={handleReorderSubmit} />
      default:
        return null
    }
  }

  const handleReviewSubmit = async (reviewData: any) => {
    setLoading(true)
    try {
      // API call to submit review
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      })
      
      if (response.ok) {
        toast({
          title: "Review Submitted!",
          description: "Thank you for your feedback. Your review will be published after moderation."
        })
        setSelectedAction(null)
      } else {
        throw new Error('Failed to submit review')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReturnSubmit = async (returnData: any) => {
    setLoading(true)
    try {
      // API call to submit return request
      const response = await fetch('/api/returns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(returnData)
      })
      
      if (response.ok) {
        toast({
          title: "Return Request Submitted!",
          description: "We'll review your request and contact you within 24 hours."
        })
        setSelectedAction(null)
      } else {
        throw new Error('Failed to submit return request')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit return request. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSupportSubmit = async (supportData: any) => {
    setLoading(true)
    try {
      // API call to submit support ticket
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supportData)
      })
      
      if (response.ok) {
        toast({
          title: "Support Ticket Created!",
          description: "Our support team will contact you soon."
        })
        setSelectedAction(null)
      } else {
        throw new Error('Failed to create support ticket')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create support ticket. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReorderSubmit = async (reorderData: any) => {
    setLoading(true)
    try {
      // API call to add items to cart
      for (const item of reorderData.items) {
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: item.productId,
            quantity: item.quantity
          })
        })
      }
      
      toast({
        title: "Items Added to Cart!",
        description: `${reorderData.items.length} items have been added to your cart.`
      })
      setSelectedAction(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add items to cart. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-800">Order Delivered Successfully!</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            We hope you're happy with your organic products! Here are some actions you can take:
          </p>
          
          {!selectedAction && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ActionCard
                icon={Star}
                title="Write a Review"
                description="Share your experience with other customers"
                actionType="review"
                color="yellow"
                disabled={!canReview}
              />
              
              <ActionCard
                icon={RotateCcw}
                title="Return/Exchange"
                description="Request return or exchange if needed"
                actionType="return"
                color="blue"
                disabled={!canReturn}
              />
              
              <ActionCard
                icon={MessageSquare}
                title="Contact Support"
                description="Get help or report any issues"
                actionType="support"
                color="purple"
              />
              
              <ActionCard
                icon={ShoppingCart}
                title="Reorder Items"
                description="Quickly reorder the same products"
                actionType="reorder"
                color="green"
                disabled={!canReorder}
              />
            </div>
          )}

          {selectedAction && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {selectedAction === 'review' && 'Write a Review'}
                  {selectedAction === 'return' && 'Return Request'}
                  {selectedAction === 'support' && 'Contact Support'}
                  {selectedAction === 'reorder' && 'Reorder Items'}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedAction(null)}
                >
                  Back
                </Button>
              </div>
              
              {renderActionForm()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Sub-components for each action form
function ReviewForm({ order, onSubmit }: { order: any, onSubmit: (data: any) => void }) {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      orderId: order.id,
      productId: selectedProduct,
      rating,
      title,
      comment
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="product">Select Product to Review</Label>
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a product" />
          </SelectTrigger>
          <SelectContent>
            {order.items.map((item: any) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name} (Qty: {item.quantity})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Rating</Label>
        <div className="flex space-x-1 mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-6 w-6 cursor-pointer ${
                star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="title">Review Title (Optional)</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Great quality products!"
        />
      </div>

      <div>
        <Label htmlFor="comment">Your Review</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell others about your experience..."
          rows={4}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={!selectedProduct || rating === 0}
      >
        Submit Review
      </Button>
    </form>
  )
}

function ReturnForm({ order, onSubmit }: { order: any, onSubmit: (data: any) => void }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      orderId: order.id,
      items: selectedItems,
      reason,
      description
    })
  }

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Select Items to Return</Label>
        <div className="space-y-2 mt-2">
          {order.items.map((item: any) => (
            <div key={item.id} className="flex items-center space-x-2 p-2 border rounded">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItem(item.id)}
                className="rounded"
              />
              <span className="flex-1">{item.name} (Qty: {item.quantity})</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="reason">Reason for Return</Label>
        <Select value={reason} onValueChange={setReason}>
          <SelectTrigger>
            <SelectValue placeholder="Select reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="damaged">Damaged Product</SelectItem>
            <SelectItem value="wrong_item">Wrong Item Delivered</SelectItem>
            <SelectItem value="not_as_described">Not as Described</SelectItem>
            <SelectItem value="quality_issue">Quality Issue</SelectItem>
            <SelectItem value="expired">Product Expired</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please describe the issue in detail..."
          rows={4}
          required
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Return Policy:</p>
            <ul className="space-y-1 text-xs">
              <li>• Returns accepted within 7 days of delivery</li>
              <li>• Products should be in original packaging</li>
              <li>• Perishable items may have different return conditions</li>
              <li>• Refund will be processed after inspection</li>
            </ul>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={selectedItems.length === 0 || !reason || !description}
      >
        Submit Return Request
      </Button>
    </form>
  )
}

function SupportForm({ order, onSubmit }: { order: any, onSubmit: (data: any) => void }) {
  const [category, setCategory] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      orderId: order.id,
      category,
      subject,
      description,
      priority
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="category">Issue Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="order_issue">Order Issue</SelectItem>
            <SelectItem value="product_quality">Product Quality</SelectItem>
            <SelectItem value="delivery_problem">Delivery Problem</SelectItem>
            <SelectItem value="payment_issue">Payment Issue</SelectItem>
            <SelectItem value="account_help">Account Help</SelectItem>
            <SelectItem value="general_inquiry">General Inquiry</SelectItem>
            <SelectItem value="complaint">Complaint</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief description of your issue"
          required
        />
      </div>

      <div>
        <Label htmlFor="priority">Priority</Label>
        <RadioGroup value={priority} onValueChange={setPriority}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high">High</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please provide detailed information about your issue..."
          rows={4}
          required
        />
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <div className="flex items-start space-x-2">
          <HelpCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div className="text-sm text-green-800">
            <p className="font-medium mb-1">Support Information:</p>
            <p className="text-xs">
              Our support team typically responds within 4-6 hours during business hours. 
              For urgent issues, you can also call us at +91 98765 43210.
            </p>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-purple-600 hover:bg-purple-700"
        disabled={!category || !subject || !description}
      >
        Create Support Ticket
      </Button>
    </form>
  )
}

function ReorderForm({ order, onSubmit }: { order: any, onSubmit: (data: any) => void }) {
  const [selectedItems, setSelectedItems] = useState<string[]>(order.items.map((item: any) => item.id))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const itemsToReorder = order.items.filter((item: any) => selectedItems.includes(item.id))
    onSubmit({
      items: itemsToReorder.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity
      }))
    })
  }

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const selectedTotal = order.items
    .filter((item: any) => selectedItems.includes(item.id))
    .reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Select Items to Reorder</Label>
        <div className="space-y-2 mt-2">
          {order.items.map((item: any) => (
            <div key={item.id} className="flex items-center space-x-2 p-2 border rounded">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItem(item.id)}
                className="rounded"
              />
              <span className="flex-1">{item.name} (Qty: {item.quantity})</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-green-800">
              Selected Items: {selectedItems.length}
            </span>
            <span className="font-semibold text-green-800">
              Total: ₹{selectedTotal}
            </span>
          </div>
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={selectedItems.length === 0}
      >
        Add to Cart ({selectedItems.length} items)
      </Button>
    </form>
  )
}
