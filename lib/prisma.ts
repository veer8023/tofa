import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Add connection pool configuration
  __internal: {
    engine: {
      connectionLimit: 10,
      pool: {
        min: 2,
        max: 10,
        idleTimeoutMillis: 30000,
        acquireTimeoutMillis: 30000,
        createTimeoutMillis: 30000,
        destroyTimeoutMillis: 5000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 200,
      },
    },
  },
})

// Add connection health check
export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection check failed:', error)
    return false
  }
}

// Add retry logic for database operations
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      
      // Check if it's a connection error
      if (error instanceof Error && 
          (error.message.includes('connection') || 
           error.message.includes('closed') ||
           error.message.includes('timeout'))) {
        
        console.warn(`Database connection attempt ${attempt} failed, retrying...`)
        
        if (attempt < maxRetries) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, delay * attempt))
          
          // Try to reconnect
          try {
            await prisma.$connect()
          } catch (connectError) {
            console.error('Failed to reconnect to database:', connectError)
          }
          
          continue
        }
      }
      
      // If it's not a connection error or we've exhausted retries, throw the error
      throw error
    }
  }
  
  throw lastError!
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
