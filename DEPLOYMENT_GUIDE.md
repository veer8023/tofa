# TOFA Website Deployment Guide

## 🚀 Quick Deployment Checklist

### Pre-Deployment Setup

1. **Environment Variables** ✅
   - [ ] Create `.env` file with all required variables
   - [ ] Set strong JWT and NextAuth secrets
   - [ ] Configure production database URL
   - [ ] Update Google OAuth credentials for production

2. **Database Setup** ✅
   - [ ] Ensure PostgreSQL database is running
   - [ ] Run `npx prisma db push` to apply migrations
   - [ ] Test database connection

3. **Build Testing** ✅
   - [ ] Run `npm run build` locally
   - [ ] Fix any build errors
   - [ ] Test all API routes

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

2. **Environment Variables in Vercel**
   - Go to your project dashboard
   - Navigate to Settings > Environment Variables
   - Add all variables from your `.env` file
   - **Important**: Update `NEXTAUTH_URL` to your production domain

3. **Database Configuration**
   - Use Neon, Supabase, or any PostgreSQL provider
   - Update `DATABASE_URL` in Vercel environment variables
   - Ensure SSL is enabled for production

### Option 2: Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18.x or higher

2. **Environment Variables**
   - Add all variables in Netlify dashboard
   - Update `NEXTAUTH_URL` to your Netlify domain

### Option 3: Railway

1. **Deploy from GitHub**
   - Connect your GitHub repository
   - Railway will auto-detect Next.js
   - Add environment variables in dashboard

## 🔧 Required Environment Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"

# Authentication
JWT_SECRET="your-32-character-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="https://your-domain.com"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Payment (Optional)
STRIPE_SECRET_KEY="sk_live_..."
RAZORPAY_KEY_ID="rzp_live_..."
RAZORPAY_KEY_SECRET="..."

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## 🛠️ Post-Deployment Steps

1. **Test All Features**
   - [ ] User registration/login
   - [ ] Product browsing
   - [ ] Cart functionality
   - [ ] Order placement
   - [ ] Admin panel (if applicable)

2. **Performance Optimization**
   - [ ] Enable image optimization
   - [ ] Configure CDN
   - [ ] Monitor Core Web Vitals

3. **Security Checklist**
   - [ ] HTTPS enabled
   - [ ] Environment variables secured
   - [ ] Database connection encrypted
   - [ ] API rate limiting configured

## 🚨 Common Issues & Solutions

### Build Errors
- **Dynamic Server Usage**: Fixed in `/app/api/users/route.ts`
- **Prisma Client**: Ensure `prisma generate` runs before build
- **Environment Variables**: Check all required variables are set

### Runtime Errors
- **Database Connection**: Verify `DATABASE_URL` and SSL settings
- **Authentication**: Check `NEXTAUTH_URL` matches production domain
- **CORS Issues**: API routes configured with proper headers

### Performance Issues
- **Slow Loading**: Enable image optimization and caching
- **Database Queries**: Add proper indexing
- **Bundle Size**: Use dynamic imports for large components

## 📞 Support

If you encounter issues:
1. Check the build logs in your hosting platform
2. Verify all environment variables are set correctly
3. Test database connectivity
4. Review the application logs for errors

## 🔄 Continuous Deployment

For automatic deployments:
1. Connect your GitHub repository to your hosting platform
2. Configure branch-based deployments
3. Set up environment variables for each environment
4. Enable automatic builds on push

---

**Happy Deploying! 🎉** 