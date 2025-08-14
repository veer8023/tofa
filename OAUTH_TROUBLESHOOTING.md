# OAuth Error Troubleshooting - Step by Step

## Current Error
```
OAUTH_CALLBACK_ERROR invalid_client (Unauthorized)
```

## Checklist for Resolution

### 1. ✅ Verify Google Cloud Console Configuration

Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials):

**Find this OAuth 2.0 Client ID**: `1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com`

**Check these settings**:
- [ ] **Application type**: Web application
- [ ] **Authorized JavaScript origins**: 
  - `https://tarasvie.vu` ✅
  - `http://localhost:3000` (for testing)
- [ ] **Authorized redirect URIs**:
  - `https://tarasvie.vu/api/auth/callback/google` ✅
  - `http://localhost:3000/api/auth/callback/google` (for testing)

### 2. ✅ Verify Vercel Environment Variables

In your Vercel dashboard, check these **exact** values:

```env
NEXTAUTH_URL=https://tarasvie.vu
GOOGLE_CLIENT_ID=1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_SECRET=KfzeFexrQI3CSZ6Oult/OkTpfmR+GKbcL2U9BlNpHzI=
```

**Critical**: Make sure these are set for **Production** environment, not just Preview!

### 3. ✅ Debug Your Current Configuration

Visit: `https://tarasvie.vu/api/debug-config`

This will show you what environment variables are actually being used in production.

Expected output:
```json
{
  "nextAuthUrl": "https://tarasvie.vu",
  "googleClientId": "1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh...",
  "googleClientSecretSet": true,
  "nextAuthSecretSet": true
}
```

### 4. ✅ Common Issues and Solutions

#### Issue A: Environment Variables Not Updated
**Problem**: Vercel still using old environment variables
**Solution**: 
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Delete old variables
3. Add new ones for Production environment
4. Redeploy

#### Issue B: Google OAuth App Not Configured
**Problem**: Google Cloud Console not updated with new domain
**Solution**:
1. Verify you're editing the correct OAuth client ID
2. Add `https://tarasvie.vu` to authorized origins
3. Add `https://tarasvie.vu/api/auth/callback/google` to redirect URIs
4. Save changes

#### Issue C: OAuth App in Testing Mode
**Problem**: Google OAuth app not published
**Solution**:
1. Go to OAuth consent screen
2. Change from "Testing" to "In production"
3. Publish the app

#### Issue D: Domain Verification
**Problem**: Google doesn't trust your domain
**Solution**:
1. Verify domain ownership in Google Search Console
2. Add domain to OAuth app

### 5. ✅ Step-by-Step Resolution Process

**Step 1**: Check Google Cloud Console
- [ ] Log into Google Cloud Console
- [ ] Navigate to APIs & Services → Credentials
- [ ] Find OAuth client: `1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com`
- [ ] Edit and add `https://tarasvie.vu` to origins
- [ ] Add `https://tarasvie.vu/api/auth/callback/google` to redirect URIs
- [ ] Save changes

**Step 2**: Update Vercel Environment Variables
- [ ] Go to Vercel Dashboard
- [ ] Find your tarasvie.vu project
- [ ] Go to Settings → Environment Variables
- [ ] Set `NEXTAUTH_URL=https://tarasvie.vu` for Production
- [ ] Set `GOOGLE_CLIENT_ID=1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com`
- [ ] Set `GOOGLE_CLIENT_SECRET=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`
- [ ] Save all changes

**Step 3**: Redeploy Application
- [ ] In Vercel Dashboard, go to Deployments
- [ ] Click "Redeploy" on the latest deployment
- [ ] Wait for deployment to complete

**Step 4**: Test Configuration
- [ ] Visit `https://tarasvie.vu/api/debug-config`
- [ ] Verify all environment variables are correct
- [ ] Try Google OAuth login
- [ ] Check Vercel function logs if still failing

### 6. ✅ If Still Not Working

**Create a completely new OAuth app**:

1. Go to Google Cloud Console
2. Create new OAuth 2.0 Client ID
3. Set up with these exact settings:
   - **Application type**: Web application
   - **Name**: Tarasvie Production New
   - **Authorized JavaScript origins**: `https://tarasvie.vu`
   - **Authorized redirect URIs**: `https://tarasvie.vu/api/auth/callback/google`
4. Copy the new Client ID and Secret
5. Update Vercel environment variables with new credentials
6. Redeploy

### 7. ✅ Quick Commands

**Check Vercel logs**:
```bash
vercel logs --follow
```

**Force redeploy**:
```bash
vercel --prod --force
```

### 8. ✅ Expected Timeline

- Google Cloud Console update: 1-2 minutes
- Vercel environment variables: 1-2 minutes  
- Redeployment: 2-3 minutes
- Testing: 1 minute

**Total time**: ~7 minutes

### 9. ✅ Success Indicators

✅ Debug endpoint shows correct NEXTAUTH_URL
✅ Google OAuth redirects without errors
✅ User can sign in successfully
✅ No more invalid_client errors in logs

If you follow these steps exactly, your OAuth should work perfectly!
