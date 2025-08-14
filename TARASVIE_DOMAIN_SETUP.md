# Tarasvie.vu Domain Setup Guide

## Production Deployment Configuration

Your application is deployed at: **https://tarasvie.vu**

## 1. Google OAuth Configuration

### Step 1: Update Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services > Credentials**
3. Click on your OAuth 2.0 Client ID: `1089074557870-tid41perkbl76ut5nvi0ohdg5csl5mbu.apps.googleusercontent.com`

### Step 2: Add Production URLs
In **Authorized redirect URIs**, add:
```
https://tarasvie.vu/api/auth/callback/google
```

In **Authorized JavaScript origins**, add:
```
https://tarasvie.vu
```

### Step 3: Consider Using New OAuth Credentials
You have new OAuth credentials in your .env comments:
- Client ID: `1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com`
- Client Secret: `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`

If you want to use these instead, update them in Vercel environment variables.

## 2. Vercel Environment Variables

### Required Environment Variables for Production:

1. **NEXTAUTH_URL**
   ```
   https://tarasvie.vu
   ```

2. **NEXTAUTH_SECRET**
   ```
   KfzeFexrQI3CSZ6Oult/OkTpfmR+GKbcL2U9BlNpHzI=
   ```

3. **DATABASE_URL**
   ```
   postgresql://neondb_owner:npg_2dAEKclQX7xC@ep-aged-bonus-a44l6oz3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```

4. **GOOGLE_CLIENT_ID** (current or new)
   ```
   Current: 1089074557870-tid41perkbl76ut5nvi0ohdg5csl5mbu.apps.googleusercontent.com
   New: 1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com
   ```

5. **GOOGLE_CLIENT_SECRET** (current or new)
   ```
   Current: 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
   New: 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
   ```

6. **JWT_SECRET**
   ```
   a3518cf805bdbaa962ebf60fde0f2e8a74ee911337021e4c7e5b1ba45cf5bf9a
   ```

7. **RESEND_API_KEY**
   ```
   re_dxq5YNNW_8skr1xcvy3369VXtMK4MBepo
   ```

8. **ADMIN_EMAIL**
   ```
   veereshthakur8023@gmail.com
   ```

### How to Set Environment Variables in Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your project (tarasvie.vu)
3. Go to **Settings > Environment Variables**
4. Add each variable above with their values
5. Make sure to set them for **Production** environment
6. After adding all variables, redeploy your application

## 3. Testing the Setup

After completing the above steps:

1. Visit https://tarasvie.vu
2. Try to sign in with Google
3. The OAuth should work without redirect_uri_mismatch errors

## 4. Package Tracking Features

Your application includes comprehensive package tracking with:
- Delhivery tracking
- Blue Dart tracking
- DTDC tracking
- FedEx tracking

Test the tracking functionality at: https://tarasvie.vu/track-order

## 5. Admin Panel

Access your admin panel at: https://tarasvie.vu/admin

## Troubleshooting

If you still encounter OAuth issues:

1. **Double-check redirect URI**: Ensure `https://tarasvie.vu/api/auth/callback/google` is exactly in Google Cloud Console
2. **Clear browser cache**: OAuth issues can be cached
3. **Check Vercel logs**: Go to your Vercel dashboard and check function logs
4. **Verify NEXTAUTH_URL**: Must be exactly `https://tarasvie.vu` (no trailing slash)

## Quick Fix Commands

If you need to redeploy after setting environment variables:
```bash
# If you have Vercel CLI linked
vercel --prod

# Or trigger a redeploy from Vercel dashboard
```

## Next Steps

1. ✅ Set Google OAuth redirect URI
2. ✅ Set Vercel environment variables
3. ✅ Redeploy application
4. ✅ Test Google authentication
5. ✅ Test package tracking features
6. ✅ Verify admin panel access

Your application should be fully functional on https://tarasvie.vu after completing these steps!
