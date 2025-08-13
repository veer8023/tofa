// Test script to create a pending order for cancellation testing
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createTestOrder() {
  try {
    // First, get a user
    const user = await prisma.user.findFirst()
    if (!user) {
      console.error('No users found. Please create a user first.')
      return
    }

    // Get a product
    const product = await prisma.product.findFirst()
    if (!product) {
      console.error('No products found. Please create a product first.')
      return
    }

    console.log('Creating test order for user:', user.email)

    // Create a pending order
    const order = await prisma.order.create({
      data: {
        orderNumber: `TEST-${Date.now()}`,
        userId: user.id,
        status: 'PENDING',
        paymentMethod: 'COD',
        paymentStatus: 'PENDING',
        subtotal: 25.00,
        shippingCost: 5.00,
        tax: 2.50,
        total: 32.50,
        shippingName: 'Test Customer',
        shippingPhone: '9876543210',
        shippingAddress: '123 Test Street',
        shippingCity: 'Test City',
        shippingState: 'Test State',
        shippingPincode: '123456',
        orderItems: {
          create: [
            {
              productId: product.id,
              quantity: 2,
              price: product.price,
              orderType: 'RETAIL'
            }
          ]
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    })

    console.log('Test order created successfully:')
    console.log('Order ID:', order.id)
    console.log('Order Number:', order.orderNumber)
    console.log('Status:', order.status)
    console.log('Total:', order.total)
    console.log('Items:', order.orderItems.length)

  } catch (error) {
    console.error('Error creating test order:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestOrder()
