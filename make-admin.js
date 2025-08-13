const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function makeAdmin(email, password = 'admin123') {
  try {
    console.log('🔐 Creating admin user...')
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      // Update existing user to admin
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { role: 'ADMIN' }
      })
      console.log(`✅ User ${email} updated to ADMIN role`)
      return updatedUser
    } else {
      // Create new admin user
      const hashedPassword = await bcrypt.hash(password, 12)
      const newAdmin = await prisma.user.create({
        data: {
          name: 'Admin User',
          email,
          password: hashedPassword,
          role: 'ADMIN',
          status: 'ACTIVE'
        }
      })
      console.log(`✅ New admin user created: ${email}`)
      console.log(`🔑 Password: ${password}`)
      return newAdmin
    }
  } catch (error) {
    console.error('❌ Error creating admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Get email from command line arguments or use default
const email = process.argv[2] || 'admin@tofa.com'
const password = process.argv[3] || 'admin123'

makeAdmin(email, password)
