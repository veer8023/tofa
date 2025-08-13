import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()
  await prisma.settings.deleteMany()

  // Create admin user with hashed password
  const adminPassword = await hashPassword('admin123')
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@tofa.com',
      password: adminPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  })
  console.log('✅ Created admin user')

  // Create customer user with hashed password
  const customerPassword = await hashPassword('password123')
  const customerUser = await prisma.user.create({
    data: {
      name: 'Test Customer',
      email: 'customer@example.com',
      password: customerPassword,
      role: 'CUSTOMER',
      status: 'ACTIVE',
    },
  })
  console.log('✅ Created customer user')

  // Create products
  const products = [
    {
      name: 'Organic Apples',
      description: 'Fresh organic apples from our orchards',
      price: 2.99,
      wholesalePrice: 2.49,
      category: 'FRUITS',
      stock: 100,
      minStock: 10,
      unit: 'kg',
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
    },
    {
      name: 'Lavender Essential Oil',
      description: 'Pure lavender essential oil for aromatherapy',
      price: 15.99,
      wholesalePrice: 12.99,
      category: 'AROMATICS',
      stock: 50,
      minStock: 5,
      unit: 'ml',
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    },
  ]

  for (const product of products) {
    await prisma.product.create({ data: product })
  }
  console.log(`✅ Created ${products.length} products`)

  // Create sample order
  const order = await prisma.order.create({
    data: {
      orderNumber: `TOFA${Date.now()}`,
      userId: customerUser.id,
      status: 'PENDING',
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      subtotal: 18.98,
      shippingCost: 5.99,
      tax: 1.90,
      total: 26.87,
      shippingName: 'Test Customer',
      shippingPhone: '+0987654321',
      shippingAddress: '456 Customer Ave',
      shippingCity: 'Customer Town',
      shippingState: 'CT',
      shippingPincode: '12345',
    },
  })

  // Add order items
  const appleProduct = await prisma.product.findFirst({ where: { name: 'Organic Apples' } })
  const lavenderProduct = await prisma.product.findFirst({ where: { name: 'Lavender Essential Oil' } })

  if (appleProduct && lavenderProduct) {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: appleProduct.id,
        quantity: 2,
        price: appleProduct.price,
        orderType: 'RETAIL',
      },
    })

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: lavenderProduct.id,
        quantity: 1,
        price: lavenderProduct.price,
        orderType: 'RETAIL',
      },
    })
  }

  console.log('✅ Created sample order')

  // Create settings
  const settings = [
    { key: 'site_name', value: 'TOFA - Tarasvie Organic Farms & Aromatics', type: 'STRING' },
    { key: 'contact_email', value: 'contact@tofa.com', type: 'STRING' },
    { key: 'contact_phone', value: '+1-234-567-8900', type: 'STRING' },
    { key: 'shipping_fee', value: '5.99', type: 'NUMBER' },
    { key: 'free_shipping_threshold', value: '50.00', type: 'NUMBER' },
  ]

  for (const setting of settings) {
    await prisma.settings.create({ data: setting })
  }
  console.log(`✅ Created ${settings.length} settings`)

  console.log('\n🎉 Database seeded successfully!')
  console.log('👤 Login credentials:')
  console.log('   Admin: admin@tofa.com / admin123')
  console.log('   Customer: customer@example.com / password123')
  console.log(`📦 Products: ${products.length} items created`)
  console.log('🛒 Sample order: 1 order created')
  console.log(`⚙️ Settings: ${settings.length} configurations`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
