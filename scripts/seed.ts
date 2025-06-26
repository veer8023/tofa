import { PrismaClient } from "@prisma/client"
import { hashPassword } from "../lib/auth"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const adminPassword = await hashPassword("admin123")
  const admin = await prisma.user.upsert({
    where: { email: "admin@tofa.com" },
    update: {},
    create: {
      email: "admin@tofa.com",
      name: "TOFA Admin",
      password: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
  })

  // Create sample users
  const users = [
    {
      email: "customer@example.com",
      name: "Priya Sharma",
      role: "CUSTOMER",
    },
    {
      email: "retailer@example.com",
      name: "Green Organic Store",
      role: "RETAILER",
    },
    {
      email: "wholesaler@example.com",
      name: "Organic Wholesale Hub",
      role: "WHOLESALER",
    },
    {
      email: "john@example.com",
      name: "John Doe",
      role: "CUSTOMER",
    },
    {
      email: "sarah@example.com",
      name: "Sarah Wilson",
      role: "CUSTOMER",
    },
  ]

  for (const userData of users) {
    const password = await hashPassword("password123")
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password,
        status: "ACTIVE",
      } as any,
    })
  }

  // Create comprehensive product catalog
  const products = [
    // FRUITS
    {
      name: "Organic Apple",
      description: "Fresh, crisp organic apples from our Himachal orchards. Rich in fiber and antioxidants.",
      category: "FRUITS",
      price: 180,
      wholesalePrice: 150,
      stock: 50,
      minStock: 10,
      unit: "per kg",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Organic Pear",
      description: "Sweet and juicy organic pears, perfect for snacking and desserts.",
      category: "FRUITS",
      price: 220,
      wholesalePrice: 180,
      stock: 30,
      minStock: 10,
      unit: "per kg",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Organic Blueberry",
      description: "Antioxidant-rich organic blueberries, perfect for smoothies and breakfast.",
      category: "FRUITS",
      price: 450,
      wholesalePrice: 380,
      stock: 15,
      minStock: 5,
      unit: "per 250g",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Organic Guava",
      description: "Vitamin C rich organic guavas, naturally sweet and nutritious.",
      category: "FRUITS",
      price: 120,
      wholesalePrice: 100,
      stock: 25,
      minStock: 10,
      unit: "per kg",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Organic Persimmon",
      description: "Sweet and exotic organic persimmons, a unique seasonal treat.",
      category: "FRUITS",
      price: 280,
      wholesalePrice: 240,
      stock: 20,
      minStock: 5,
      unit: "per kg",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Organic Lemon",
      description: "Fresh organic lemons, perfect for cooking, drinks, and natural remedies.",
      category: "FRUITS",
      price: 80,
      wholesalePrice: 65,
      stock: 40,
      minStock: 15,
      unit: "per kg",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Organic Orange",
      description: "Juicy organic oranges packed with vitamin C and natural sweetness.",
      category: "FRUITS",
      price: 100,
      wholesalePrice: 85,
      stock: 35,
      minStock: 15,
      unit: "per kg",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Organic Pomegranate",
      description: "Ruby red organic pomegranates, rich in antioxidants and flavor.",
      category: "FRUITS",
      price: 320,
      wholesalePrice: 280,
      stock: 18,
      minStock: 8,
      unit: "per kg",
      image: "/placeholder.svg?height=300&width=300",
    },

    // AROMATICS & OILS
    {
      name: "Lemongrass Essential Oil",
      description: "Pure lemongrass essential oil for aromatherapy and natural wellness.",
      category: "AROMATICS",
      price: 350,
      wholesalePrice: 280,
      stock: 12,
      minStock: 5,
      unit: "per 10ml",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Apricot Kernel Oil",
      description: "Cold-pressed apricot kernel oil, perfect for skincare and massage.",
      category: "OILS",
      price: 420,
      wholesalePrice: 350,
      stock: 15,
      minStock: 8,
      unit: "per 15ml",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Lavender Essential Oil",
      description: "Calming lavender essential oil for relaxation and better sleep.",
      category: "AROMATICS",
      price: 480,
      wholesalePrice: 400,
      stock: 10,
      minStock: 5,
      unit: "per 10ml",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Rose Hip Oil",
      description: "Premium rose hip oil rich in vitamins for anti-aging skincare.",
      category: "OILS",
      price: 650,
      wholesalePrice: 550,
      stock: 8,
      minStock: 3,
      unit: "per 15ml",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Eucalyptus Essential Oil",
      description: "Refreshing eucalyptus oil for respiratory wellness and aromatherapy.",
      category: "AROMATICS",
      price: 380,
      wholesalePrice: 320,
      stock: 14,
      minStock: 6,
      unit: "per 10ml",
      image: "/placeholder.svg?height=300&width=300",
    },

    // HERBS
    {
      name: "Organic Turmeric Powder",
      description: "Premium quality organic turmeric powder with high curcumin content.",
      category: "HERBS",
      price: 180,
      wholesalePrice: 150,
      stock: 45,
      minStock: 20,
      unit: "per 100g",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Organic Ginger Powder",
      description: "Pure organic ginger powder for cooking and natural remedies.",
      category: "HERBS",
      price: 220,
      wholesalePrice: 180,
      stock: 30,
      minStock: 15,
      unit: "per 100g",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Organic Ashwagandha Powder",
      description: "Premium ashwagandha root powder for stress relief and wellness.",
      category: "HERBS",
      price: 450,
      wholesalePrice: 380,
      stock: 25,
      minStock: 10,
      unit: "per 100g",
      image: "/placeholder.svg?height=300&width=300",
    },

    // OTHER PRODUCTS
    {
      name: "Raw Organic Honey",
      description: "Pure, unprocessed honey from our organic farms, rich in enzymes.",
      category: "OTHER",
      price: 380,
      wholesalePrice: 320,
      stock: 22,
      minStock: 10,
      unit: "per 500g",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Organic Ghee",
      description: "Traditional organic ghee made from grass-fed cow milk.",
      category: "OTHER",
      price: 650,
      wholesalePrice: 550,
      stock: 18,
      minStock: 8,
      unit: "per 500g",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: {
        ...product,
        isActive: true,
      },
    })
  }

  // Create sample settings
  const settings = [
    { key: "site_name", value: "TOFA - Tarasv Organic Farms & Aromatics", type: "STRING" },
    { key: "contact_email", value: "info@tofa.com", type: "STRING" },
    { key: "contact_phone", value: "+91 98765 43210", type: "STRING" },
    { key: "free_shipping_threshold", value: "500", type: "NUMBER" },
    { key: "standard_shipping_cost", value: "50", type: "NUMBER" },
    { key: "cod_enabled", value: "true", type: "BOOLEAN" },
    { key: "online_payment_enabled", value: "false", type: "BOOLEAN" },
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting as any,
    })
  }

  console.log("✅ Database seeded successfully!")
  console.log(`📊 Created ${users.length + 1} users`)
  console.log(`🛍️ Created ${products.length} products`)
  console.log(`⚙️ Created ${settings.length} settings`)
  console.log("\n👤 Login credentials:")
  console.log("Admin: admin@tofa.com / admin123")
  console.log("Customer: customer@example.com / password123")
  console.log("Retailer: retailer@example.com / password123")
  console.log("Wholesaler: wholesaler@example.com / password123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
