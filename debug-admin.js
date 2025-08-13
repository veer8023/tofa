const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function debugAdmin() {
  try {
    console.log('🔍 Debugging admin access...')
    
    // Find all users with admin role
    const adminUsers = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true
      }
    })
    
    console.log(`\n👑 Found ${adminUsers.length} admin user(s):`)
    adminUsers.forEach(user => {
      console.log(`  - ${user.name} (${user.email})`)
      console.log(`    ID: ${user.id}`)
      console.log(`    Role: ${user.role}`)
      console.log(`    Status: ${user.status}`)
      console.log(`    Created: ${user.createdAt}\n`)
    })
    
    // Check all users
    const allUsers = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        role: true,
        status: true
      }
    })
    
    console.log(`\n👥 All users in database (${allUsers.length} total):`)
    allUsers.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role} - ${user.status}`)
    })
    
    console.log('\n🔑 Login with:')
    console.log('  Email: admin@tofa.com')
    console.log('  Password: admin123')
    console.log('  URL: http://localhost:3000/admin')
    
  } catch (error) {
    console.error('❌ Error debugging admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugAdmin()
