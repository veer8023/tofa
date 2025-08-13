# Admin Email Notification Setup Guide

## 🎯 Overview
This guide will help you set up email notifications for admin when new orders are created. The system uses Resend email service for reliable delivery.

## 📋 Prerequisites
- Active Resend account (free tier available)
- Domain verification (for production) or use Resend's test domain
- Admin email address

## 🚀 Setup Steps

### Step 1: Get Resend API Key

1. **Sign up for Resend**: Visit [resend.com](https://resend.com) and create a free account
2. **Verify your domain** (optional for development):
   - Go to Domains section in Resend dashboard
   - Add your domain (e.g., tofa.com)
   - Follow DNS verification steps
3. **Generate API Key**:
   - Go to API Keys section
   - Click "Create API Key"
   - Give it a name like "TOFA Order Notifications"
   - Copy the generated key (starts with `re_`)

### Step 2: Update Environment Variables

Replace the placeholder in your `.env.local` file:

```bash
# Replace this line:
RESEND_API_KEY=your_resend_api_key_here

# With your actual API key:
RESEND_API_KEY=re_your_actual_api_key_here

# Update admin email if needed:
ADMIN_EMAIL=your-actual-admin@email.com
```

### Step 3: Configure Email Domain (Production)

For production, update the "from" address in `/lib/email.ts`:

```typescript
// Change this line:
from: "TOFA Orders <orders@tofa.com>",

// To your verified domain:
from: "TOFA Orders <orders@yourdomain.com>",
```

## 🧪 Testing the System

### Test Email Notifications

1. **Place a test order**:
   - Add products to cart
   - Go through checkout process
   - Complete order placement

2. **Check admin email**:
   - Check the configured admin email inbox
   - Look for email with subject "🔔 New Order Received - [Order Number]"

3. **Check server logs**:
   - Look for "✅ Admin notification email sent successfully"
   - Or "⚠️ Failed to send admin notification email"

### Test Real-time Notifications

1. **Login as admin**:
   - Go to `/admin` dashboard
   - Look for bell icon in top-right header

2. **Place order in another browser/incognito**:
   - Complete an order as a customer
   - Watch admin dashboard for real-time notification
   - Toast notification should appear
   - Bell icon should show notification count

## 📧 Email Template Features

The notification email includes:
- ✅ Order summary with order number and date
- ✅ Customer information (name, email, phone, address)
- ✅ Detailed item list with quantities and prices
- ✅ Price breakdown (subtotal, shipping, tax, total)
- ✅ Direct link to admin dashboard
- ✅ Professional HTML formatting
- ✅ Mobile-responsive design

## 🔧 Troubleshooting

### Email Not Sending

1. **Check API Key**:
   ```bash
   # Verify in .env.local
   echo $RESEND_API_KEY
   ```

2. **Check server logs**:
   ```bash
   # Look for these messages:
   ✅ Admin notification email sent successfully
   ⚠️ RESEND_API_KEY not configured
   ❌ Failed to send order notification email
   ```

3. **Verify domain** (if using custom domain):
   - Ensure DNS records are properly configured
   - Use Resend dashboard to verify domain status

### Real-time Notifications Not Working

1. **Check admin role**:
   - Ensure user has `ADMIN` role in database
   - Verify session contains correct role

2. **Check browser console**:
   - Look for JavaScript errors
   - Verify API endpoints are accessible

3. **Check notification API**:
   - Test `/api/admin/notifications` endpoint
   - Verify it returns recent orders

## 🎨 Customization Options

### Custom Email Template

Modify `/lib/email.ts` to customize:
- Email styling and branding
- Additional order information
- Company logo and colors
- Email footer content

### Notification Settings

Modify `/components/admin/admin-notifications.tsx` to customize:
- Polling frequency (currently 30 seconds)
- Notification display duration
- Maximum notifications shown
- Notification sound (add audio alerts)

### WhatsApp Integration (Future)

The system includes a placeholder for WhatsApp notifications:
- Implement WhatsApp Business API
- Use services like Twilio or direct WhatsApp API
- Configure phone numbers and templates

## 🔐 Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Regularly rotate API keys
- Monitor email sending quotas and usage
- Implement rate limiting for notification endpoints

## 📊 Monitoring

### Email Delivery Tracking

1. **Resend Dashboard**:
   - Monitor email delivery status
   - Track open rates and engagement
   - View bounce and complaint rates

2. **Application Logs**:
   - Track successful/failed notifications
   - Monitor API response times
   - Log notification preferences

### Performance Optimization

- Email sending is non-blocking (doesn't slow down order creation)
- Failed emails don't prevent order completion
- Graceful fallbacks for missing configuration
- Efficient notification polling with timestamps

## 📞 Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review server logs for error messages
3. Test with Resend's API documentation
4. Verify all environment variables are set correctly

---

*Once configured, your admin will receive instant email notifications and real-time dashboard alerts for every new order! 🎉*
