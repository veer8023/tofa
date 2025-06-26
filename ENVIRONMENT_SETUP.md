# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

### Database Configuration
\`\`\`
DATABASE_URL="postgresql://username:password@localhost:5432/tofa_db"
\`\`\`

### Authentication
\`\`\`
JWT_SECRET="your-super-secret-jwt-key-here-minimum-32-characters"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### Email Configuration (Optional)
\`\`\`
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your_email@gmail.com"
SMTP_PASS="your_app_password"
\`\`\`

### Payment Configuration (Server-side only)
\`\`\`
# These are used only in server-side code and API routes
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
RAZORPAY_KEY_ID="rzp_test_your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
\`\`\`

## Security Notes

- **Never expose sensitive keys to the client side**
- All payment-related keys are used only in server components and API routes
- JWT secrets should be at least 32 characters long
- Use different secrets for development and production

## Deployment

For production deployment:

1. Set all environment variables in your hosting platform
2. Use strong, unique secrets for production
3. Ensure DATABASE_URL points to your production database
4. Update NEXTAUTH_URL to your production domain

## Payment Integration

Payment integration is currently disabled. When implementing:

1. Set up proper webhook endpoints
2. Use server actions for payment processing
3. Never expose secret keys to client-side code
4. Implement proper error handling and logging
