import { z } from 'zod'

// User validation schemas
export const userRegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['CUSTOMER', 'RETAILER', 'WHOLESALER', 'ADMIN']).default('CUSTOMER'),
})

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Product validation schemas
export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Product name must be less than 100 characters'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  wholesalePrice: z.number().min(0, 'Wholesale price cannot be negative'),
  category: z.enum(['FRUITS', 'AROMATICS']),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  minStock: z.number().int().min(0, 'Minimum stock cannot be negative'),
  unit: z.string().min(1, 'Unit is required'),
  image: z.string().url('Invalid image URL').optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
})

export const productUpdateSchema = productSchema.partial()

// Order validation schemas
export const orderSchema = z.object({
  orderNumber: z.string().min(1, 'Order number is required'),
  userId: z.string().min(1, 'User ID is required'),
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']).default('PENDING'),
  paymentMethod: z.enum(['COD', 'ONLINE']),
  paymentStatus: z.enum(['PENDING', 'PAID', 'FAILED']).default('PENDING'),
  subtotal: z.number().positive('Subtotal must be positive'),
  shippingCost: z.number().min(0, 'Shipping cost cannot be negative'),
  tax: z.number().min(0, 'Tax cannot be negative'),
  total: z.number().positive('Total must be positive'),
  trackingNumber: z.string().optional(),
  shippingName: z.string().min(1, 'Shipping name is required'),
  shippingPhone: z.string().min(1, 'Shipping phone is required'),
  shippingAddress: z.string().min(1, 'Shipping address is required'),
  shippingCity: z.string().min(1, 'Shipping city is required'),
  shippingState: z.string().min(1, 'Shipping state is required'),
  shippingPincode: z.string().min(1, 'Shipping pincode is required'),
})

export const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
  orderType: z.enum(['RETAIL', 'WHOLESALE']),
})

// Cart validation schemas - Updated to include userId
export const cartItemSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
  orderType: z.enum(['RETAIL', 'WHOLESALE']).default('RETAIL'),
})

// Search and filter schemas - Fixed to handle null values
export const productSearchSchema = z.object({
  category: z.string().nullable().optional(),
  search: z.string().nullable().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
})

// Validation helper functions
export const validateInput = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
      throw new Error(`Validation failed: ${messages}`)
    }
    throw error
  }
}

export const validatePartialInput = <T>(schema: z.ZodSchema<T>, data: unknown): Partial<T> => {
  try {
    return schema.partial().parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
      throw new Error(`Validation failed: ${messages}`)
    }
    throw error
  }
} 