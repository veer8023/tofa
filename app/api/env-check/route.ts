import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Simple environment check endpoint
  const config = {
    nextAuthUrl: process.env.NEXTAUTH_URL || 'NOT SET',
    googleClientId: process.env.GOOGLE_CLIENT_ID ? 
      process.env.GOOGLE_CLIENT_ID.substring(0, 30) + '...' : 'NOT SET',
    googleClientSecretSet: !!process.env.GOOGLE_CLIENT_SECRET,
    nextAuthSecretSet: !!process.env.NEXTAUTH_SECRET,
    nodeEnv: process.env.NODE_ENV || 'NOT SET',
    timestamp: new Date().toISOString(),
    domain: request.headers.get('host') || 'unknown'
  };

  return NextResponse.json(config, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  });
}
