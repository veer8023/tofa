import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  try {
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
    console.log("✅ Created admin user")

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
    console.log("✅ Created customer user")

    // Create sample products
    const products = [
      {
        name: "Organic Mangoes",
        description: "Sweet and juicy organic mangoes from Kerala",
        price: 150.0,
        category: "FRUITS" as const,
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
        category: "FRUITS" as const,
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
        category: "AROMATICS" as const,
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
        category: "AROMATICS" as const,
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
        category: "OILS" as const,
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
        category: "HERBS" as const,
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
        category: "OTHER" as const,
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
        category: "FRUITS" as const,
        image: "/placeholder.svg?height=300&width=300",
        stock: 15,
        unit: "kg",
        featured: true,
        organic: true,
      },
    ]

    // Create products one by one
    for (const productData of products) {
      await prisma.product.upsert({
        where: { name: productData.name },
        update: {
          description: productData.description,
          price: productData.price,
          category: productData.category,
          image: productData.image,
          stock: productData.stock,
          unit: productData.unit,
          featured: productData.featured,
          organic: productData.organic,
        },
        create: productData,
      })
    }
    console.log(`✅ Created ${products.length} products`)

    // Get created products for order creation
    const mango = await prisma.product.findUnique({ where: { name: "Organic Mangoes" } })
    const coconutOil = await prisma.product.findUnique({ where: { name: "Coconut Oil" } })

    if (mango && coconutOil) {
      // Create sample order
      const existingOrder = await prisma.order.findFirst({
        where: { userId: customer.id },
      })

      if (!existingOrder) {
        const sampleOrder = await prisma.order.create({
          data: {
            userId: customer.id,
            status: "DELIVERED",
            total: 550.0,
            paymentMethod: "COD",
            paymentStatus: "PAID",
            shippingAddress: "Mumbai, Maharashtra, India",
            phone: "+91-9876543211",
            notes: "Please deliver in the morning",
            orderItems: {
              create: [
                {
                  productId: mango.id,
                  quantity: 2,
                  price: 150.0,
                },
                {
                  productId: coconutOil.id,
                  quantity: 1,
                  price: 250.0,
                },
              ],
            },
          },
        })
        console.log("✅ Created sample order")
      }
    }

    // Create app settings
    const settings = [
      { key: "app_name", value: "TOFA Organic Farm" },
      { key: "delivery_fee", value: "50" },
      { key: "free_delivery_threshold", value: "500" },
      { key: "contact_email", value: "info@tofa.com" },
      { key: "contact_phone", value: "+91-9876543210" },
    ]

    for (const setting of settings) {
      await prisma.settings.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: setting,
      })
    }
    console.log(`✅ Created ${settings.length} settings`)

    console.log("\n🎉 Database seeded successfully!")
    console.log("👤 Login credentials:")
    console.log("   Admin: admin@tofa.com / admin123")
    console.log("   Customer: customer@example.com / password123")
    console.log(`📦 Products: ${products.length} items created`)
    console.log("🛒 Sample order: 1 order created")
    console.log(`⚙️ Settings: ${settings.length} configurations`)
  } catch (error) {
    console.error("❌ Error during seeding:", error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
