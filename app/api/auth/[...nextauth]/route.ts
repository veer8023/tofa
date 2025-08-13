import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { log } from "@/lib/logger"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          log.authError('unknown', 'login', 'Missing credentials')
          return null
        }

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            log.authError('unknown', 'login', `User not found: ${credentials.email}`)
            return null
          }

          // OAuth users don't have passwords
          if (!user.password) {
            log.authError(user.id, 'login', 'OAuth user trying to login with password')
            return null
          }

          // Verify password using bcrypt
          const isValidPassword = await bcrypt.compare(credentials.password, user.password)
          
          if (!isValidPassword) {
            log.authError(user.id, 'login', 'Invalid password')
            return null
          }

          log.userAction(user.id, 'login', { email: user.email })
          
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          log.authError('unknown', 'login', `Authorization error: ${error}`)
          return null
        }
      }
    })
  ],
  session: { 
    strategy: "jwt" as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    signIn: async ({ user, account, profile }) => {
      try {
        // Allow credentials provider to proceed normally
        if (account?.provider === "credentials") {
          return true
        }

        // Handle Google OAuth
        if (account?.provider === "google" && user.email) {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          })

          if (existingUser) {
            // User exists - this is the key fix for OAuthAccountNotLinked
            // We need to let NextAuth know this is OK by returning true
            // The adapter will handle linking the account
            log.userAction(existingUser.id, 'oauth_signin_existing', { 
              provider: account.provider,
              email: user.email 
            })
            return true
          } else {
            // New user - create them
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "",
                role: "CUSTOMER",
              } as any // Type assertion to bypass TypeScript cache issue
            })
            log.userAction(newUser.id, 'oauth_signup', { 
              provider: account.provider,
              email: user.email 
            })
            return true
          }
        }
        
        return true
      } catch (error) {
        log.authError('unknown', 'signin_callback', `SignIn callback error: ${error}`)
        return false
      }
    },
    
    jwt: async ({ token, user, account }) => {
      // Initial sign in
      if (user) {
        // Find the user in database to get current data
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! }
        })
        
        if (dbUser) {
          token.role = dbUser.role
          token.id = dbUser.id
          log.userAction(dbUser.id, 'jwt_created', { email: dbUser.email })
        }
      }
      return token
    },
    
    session: async ({ session, token }) => {
      // Send properties to the client
      if (session.user && token) {
        session.user.role = token.role as "CUSTOMER" | "RETAILER" | "WHOLESALER" | "ADMIN"
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }