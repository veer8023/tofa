// Debug script to verify OAuth configuration
// Run this on your production site to check environment variables

console.log('=== NextAuth Configuration Debug ===');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const config = {
      nextAuthUrl: process.env.NEXTAUTH_URL,
      googleClientId: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
      googleClientSecretSet: !!process.env.GOOGLE_CLIENT_SECRET,
      nextAuthSecretSet: !!process.env.NEXTAUTH_SECRET,
      timestamp: new Date().toISOString()
    };

    res.status(200).json(config);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
