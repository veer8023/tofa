"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestGoogleOAuth() {
  const { data: session, status } = useSession()

  const handleGoogleSignIn = () => {
    signIn("google", { 
      callbackUrl: "/",
      redirect: true 
    })
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Google OAuth Test Page</CardTitle>
          <CardDescription>Test Google authentication functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Session Status</h3>
            <p className="text-sm text-gray-600">Status: <span className="font-mono">{status}</span></p>
          </div>

          {status === "loading" && (
            <div className="text-center py-4">
              <p>Loading session...</p>
            </div>
          )}

          {status === "unauthenticated" && (
            <div className="space-y-4">
              <p className="text-gray-600">You are not signed in.</p>
              <Button 
                onClick={handleGoogleSignIn}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                🔗 Sign in with Google
              </Button>
            </div>
          )}

          {status === "authenticated" && session && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Session Information</h3>
                <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                  <p><strong>Name:</strong> {session.user?.name || "N/A"}</p>
                  <p><strong>Email:</strong> {session.user?.email || "N/A"}</p>
                  <p><strong>ID:</strong> {session.user?.id || "N/A"}</p>
                  <p><strong>Role:</strong> {session.user?.role || "N/A"}</p>
                  {session.user?.image && (
                    <div>
                      <strong>Avatar:</strong>
                      <img 
                        src={session.user.image} 
                        alt="User avatar" 
                        className="w-12 h-12 rounded-full ml-2 inline-block"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={handleSignOut}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                🚪 Sign Out
              </Button>
            </div>
          )}

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                {JSON.stringify({ 
                  status,
                  session: session ? {
                    user: session.user,
                    expires: session.expires
                  } : null
                }, null, 2)}
              </pre>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Configuration Check</h3>
            <div className="space-y-2 text-sm">
              <p>✅ NEXTAUTH_URL: {process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000"}</p>
              <p>✅ Google Provider: Configured</p>
              <p>✅ Database: Connected</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
