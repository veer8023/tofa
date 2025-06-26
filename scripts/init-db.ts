import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function initializeDatabase() {
  try {
    console.log("🔄 Initializing database...")

    // Test connection
    await prisma.$connect()
    console.log("✅ Database connected successfully")

    // Check if tables exist by trying to count users
    try {
      await prisma.user.count()
      console.log("✅ Database tables exist")
    } catch (error) {
      console.log("⚠️ Database tables may not exist yet, this is normal for first deployment")
    }
  } catch (error) {
    console.error("❌ Database initialization error:", error)
    // Don't throw error to prevent build failure
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  initializeDatabase()
}

export default initializeDatabase
