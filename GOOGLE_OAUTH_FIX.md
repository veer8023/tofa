# Google OAuth Configuration Fix for TOFA

## Error: redirect_uri_mismatch

### Quick Fix Steps:

1. **Get Your Production URL**
   - Check your Vercel deployment dashboard
   - URL format: https://your-project-name.vercel.app

2. **Update Google Cloud Console**
   - Go to: https://console.cloud.google.com/
   - Navigate: APIs & Services → Credentials
   - Edit your OAuth 2.0 Client ID
   - Add to "Authorized redirect URIs":
     ```
     https://your-actual-vercel-url.vercel.app/api/auth/callback/google
     http://localhost:3000/api/auth/callback/google
     ```

3. **Update Vercel Environment Variables**
   ```
   NEXTAUTH_URL=https://your-actual-vercel-url.vercel.app
   GOOGLE_CLIENT_ID=1089074557870-tid41perkbl76ut5nvi0ohdg5csl5mbu.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   ```

4. **Redeploy** after environment variable changes

### Example URLs to Add:
If your site is `https://tofa-abc123.vercel.app`, add:
- `https://tofa-abc123.vercel.app/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/google`

### Verification:
After changes, test Google OAuth login - should work without redirect_uri_mismatch error.
