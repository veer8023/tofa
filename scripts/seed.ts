import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@tofa.com" },
    update: {},
    create: {
      email: "admin@tofa.com",
      password: adminPassword,
      name: "Admin User",
      role: "ADMIN",
      phone: "+91-9876543210",
      address: "TOFA Organic Farm, Kerala, India",
    },
  })

  // Create customer user
  const customerPassword = await bcrypt.hash("password123", 10)
  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      password: customerPassword,
      name: "John Customer",
      role: "CUSTOMER",
      phone: "+91-9876543211",
      address: "Mumbai, Maharashtra, India",
    },
  })

  // Create sample products
  const products = [
    {
      name: "Organic Mangoes",
      description: "Sweet and juicy organic mangoes from Kerala",
      price: 150.0,
      category: "FRUITS",
      image: "/placeholder.svg?height=300&width=300",
      stock: 50,
      unit: "kg",
      featured: true,
      organic: true,
    },
    {
      name: "Fresh Coconuts",
      description: "Fresh coconuts directly from our farm",
      price: 45.0,
      category: "FRUITS",
      image: "/placeholder.svg?height=300&width=300",
      stock: 100,
      unit: "piece",
      featured: true,
      organic: true,
    },
    {
      name: "Organic Cardamom",
      description: "Premium quality organic cardamom",
      price: 800.0,
      category: "AROMATICS",
      image: "/placeholder.svg?height=300&width=300",
      stock: 25,
      unit: "kg",
      featured: false,
      organic: true,
    },
    {
      name: "Black Pepper",
      description: "Freshly ground black pepper from Western Ghats",
      price: 600.0,
      category: "AROMATICS",
      image: "/placeholder.svg?height=300&width=300",
      stock: 30,
      unit: "kg",
      featured: false,
      organic: true,
    },
    {
      name: "Coconut Oil",
      description: "Pure cold-pressed coconut oil",
      price: 250.0,
      category: "OILS",
      image: "/placeholder.svg?height=300&width=300",
      stock: 40,
      unit: "liter",
      featured: true,
      organic: true,
    },
    {
      name: "Fresh Basil",
      description: "Aromatic fresh basil leaves",
      price: 80.0,
      category: "HERBS",
      image: "/placeholder.svg?height=300&width=300",
      stock: 20,
      unit: "bunch",
      featured: false,
      organic: true,
    },
    {
      name: "Organic Turmeric",
      description: "High-quality organic turmeric powder",
      price: 120.0,
      category: "OTHER",
      image: "/placeholder.svg?height=300&width=300",
      stock: 35,
      unit: "kg",
      featured: false,
      organic: true,
    },
    {
      name: "Jackfruit",
      description: "Fresh organic jackfruit",
      price: 80.0,
      category: "FRUITS",
      image: "/placeholder.svg?height=300&width=300",
      stock: 15,
      unit: "kg",
      featured: true,
      organic: true,
    },
  ]

  for (const productData of products) {
    await prisma.product.upsert({
      where: { name: productData.name },
      update: {},
      create: productData,
    })
  }

  // Create sample order
  const sampleOrder = await prisma.order.create({
    data: {
      userId: customer.id,
      status: "DELIVERED",
      total: 395.0,
      paymentMethod: "COD",
      paymentStatus: "PAID",
      shippingAddress: "Mumbai, Maharashtra, India",
      phone: "+91-9876543211",
      notes: "Please deliver in the morning",
      orderItems: {
        create: [
          {
            productId: (await prisma.product.findFirst({ where: { name: "Organic Mangoes" } }))!.id,
            quantity: 2,
            price: 150.0,
          },
          {
            productId: (await prisma.product.findFirst({ where: { name: "Coconut Oil" } }))!.id,
            quantity: 1,
            price: 250.0,
          },
        ],
      },
    },
  })

  // Create app settings
  await prisma.settings.upsert({
    where: { key: "app_name" },
    update: {},
    create: {
      key: "app_name",
      value: "TOFA Organic Farm",
    },
  })

  await prisma.settings.upsert({
    where: { key: "delivery_fee" },
    update: {},
    create: {
      key: "delivery_fee",
      value: "50",
    },
  })

  console.log("✅ Database seeded successfully!")
  console.log(`👤 Admin user: admin@tofa.com / admin123`)
  console.log(`👤 Customer user: customer@example.com / password123`)
  console.log(`📦 Created ${products.length} products`)
  console.log(`🛒 Created 1 sample order`)
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
