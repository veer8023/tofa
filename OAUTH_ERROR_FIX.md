# OAuth Error Fix Guide - Tarasvie.vu

## Error Analysis
```
OAUTH_CALLBACK_ERROR invalid_client (Unauthorized)
```

This error means Google doesn't recognize your OAuth client credentials or they're not properly configured for your domain.

## Updated OAuth Credentials
I've updated your .env to use the new Google OAuth credentials:
- **Client ID**: `1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com`
- **Client Secret**: `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`

## Step-by-Step Fix

### 1. Configure Google Cloud Console

Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials):

#### For the NEW OAuth Client ID: `1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com`

1. **Application type**: Web application
2. **Name**: Tarasvie Production
3. **Authorized JavaScript origins**:
   ```
   https://tarasvie.vu
   http://localhost:3000
   ```
4. **Authorized redirect URIs**:
   ```
   https://tarasvie.vu/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google
   ```

### 2. Update Vercel Environment Variables

In your Vercel dashboard for the tarasvie.vu project, update these environment variables:

```env
GOOGLE_CLIENT_ID=1089074557870-6p9e64bi86pm7a7kgph82g3ngebbn5sh.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_URL=https://tarasvie.vu
NEXTAUTH_SECRET=KfzeFexrQI3CSZ6Oult/OkTpfmR+GKbcL2U9BlNpHzI=
DATABASE_URL=postgresql://neondb_owner:npg_2dAEKclQX7xC@ep-aged-bonus-a44l6oz3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=a3518cf805bdbaa962ebf60fde0f2e8a74ee911337021e4c7e5b1ba45cf5bf9a
RESEND_API_KEY=re_dxq5YNNW_8skr1xcvy3369VXtMK4MBepo
ADMIN_EMAIL=veereshthakur8023@gmail.com
```

### 3. Critical Steps in Order

1. **First**: Configure Google Cloud Console OAuth settings
2. **Second**: Update Vercel environment variables
3. **Third**: Redeploy your application
4. **Fourth**: Test authentication

### 4. Verify Google Cloud Console Settings

Make sure your OAuth app has:

- ✅ **Status**: Published (not in testing mode)
- ✅ **User type**: External
- ✅ **Scopes**: email, profile, openid
- ✅ **Test users**: Not required if published

### 5. Common Issues and Solutions

#### Issue: Still getting invalid_client error
**Solution**: Double-check that the Client ID and Secret match exactly in both Google Cloud Console and Vercel

#### Issue: redirect_uri_mismatch
**Solution**: Ensure redirect URI is exactly `https://tarasvie.vu/api/auth/callback/google`

#### Issue: OAuth consent screen not configured
**Solution**: Configure the OAuth consent screen with your app details

### 6. Testing Steps

1. Clear browser cache and cookies
2. Visit https://tarasvie.vu
3. Click "Sign in with Google"
4. Should redirect to Google authorization
5. After authorization, should redirect back to your site

### 7. Debugging Commands

If you need to check the current deployment status:

```bash
# Check Vercel deployment logs
vercel logs --follow

# Or check in Vercel dashboard
# Go to your project > Functions tab > View logs
```

### 8. Alternative: Create New OAuth App

If the current OAuth app continues to have issues, create a completely new one:

1. Go to Google Cloud Console
2. Create new OAuth 2.0 Client ID
3. Configure with tarasvie.vu domain
4. Update environment variables with new credentials

### 9. Immediate Action Checklist

- [ ] Update Google Cloud Console OAuth settings for the new Client ID
- [ ] Set environment variables in Vercel dashboard
- [ ] Redeploy application from Vercel
- [ ] Test Google authentication
- [ ] Check Vercel function logs if still failing

### 10. Expected Timeline

- OAuth configuration: 2-3 minutes
- Vercel environment update: 1-2 minutes
- Redeployment: 2-3 minutes
- Testing: 1 minute

**Total time to fix**: ~10 minutes

## Support

If you continue to have issues:
1. Check Vercel function logs
2. Verify Google Cloud Console settings
3. Ensure domain ownership is verified
4. Check that OAuth app is published, not in testing mode

Your application should work perfectly after following these steps!
