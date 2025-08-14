# CRITICAL OAuth Fix - Tarasvie.vu

## 🚨 URGENT: The Problem

Your production site is still getting `invalid_client` errors because:
1. **Vercel environment variables are wrong**
2. **Google OAuth app isn't configured for tarasvie.vu**

## 🎯 EXACT SOLUTION STEPS

### Step 1: Fix Vercel Environment Variables (CRITICAL!)

Go to **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

**DELETE these if they exist (old values):**
- GOOGLE_CLIENT_ID (old value)
- GOOGLE_CLIENT_SECRET (old value)
- NEXTAUTH_URL (if set to localhost)

**ADD these exact values for PRODUCTION environment:**

```
NEXTAUTH_URL=https://tarasvie.vu
GOOGLE_CLIENT_ID=1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_SECRET=KfzeFexrQI3CSZ6Oult/OkTpfmR+GKbcL2U9BlNpHzI=
DATABASE_URL=postgresql://neondb_owner:npg_2dAEKclQX7xC@ep-aged-bonus-a44l6oz3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=a3518cf805bdbaa962ebf60fde0f2e8a74ee911337021e4c7e5b1ba45cf5bf9a
RESEND_API_KEY=re_dxq5YNNW_8skr1xcvy3369VXtMK4MBepo
ADMIN_EMAIL=veereshthakur8023@gmail.com
```

**IMPORTANT**: Make sure these are set for **Production** environment, not Preview!

### Step 2: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find OAuth 2.0 Client ID: `1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com`
3. Click **Edit**
4. In **Authorized JavaScript origins**, add:
   ```
   https://tarasvie.vu
   ```
5. In **Authorized redirect URIs**, add:
   ```
   https://tarasvie.vu/api/auth/callback/google
   ```
6. Click **Save**

### Step 3: Redeploy Application

After setting environment variables:
1. Go to Vercel Dashboard → Deployments
2. Click **Redeploy** on latest deployment
3. Wait for deployment to complete

### Step 4: Verify OAuth Consent Screen

1. Go to Google Cloud Console → OAuth consent screen
2. Make sure status is **"In production"** (not Testing)
3. If in testing, publish it

## 🔍 VERIFICATION CHECKLIST

After completing steps above:

- [ ] Vercel environment variables set for Production
- [ ] Google OAuth app has tarasvie.vu in authorized origins
- [ ] Google OAuth app has tarasvie.vu/api/auth/callback/google in redirect URIs
- [ ] OAuth consent screen is published (not in testing)
- [ ] Application redeployed after environment variable changes

## 🚨 MOST COMMON MISTAKES

1. **Setting environment variables for Preview instead of Production**
2. **Forgetting to redeploy after changing environment variables**
3. **Using old OAuth client ID instead of new one**
4. **OAuth consent screen still in testing mode**

## 🎯 QUICK TEST

After completing all steps:
1. Clear browser cache/cookies
2. Visit https://tarasvie.vu
3. Click "Sign in with Google"
4. Should work without errors

## 📞 IF STILL NOT WORKING

Try creating a completely new OAuth app:
1. Google Cloud Console → Create new OAuth 2.0 Client ID
2. Set up specifically for tarasvie.vu
3. Update Vercel with new credentials

The issue is 99% likely to be incorrect Vercel environment variables for Production!
