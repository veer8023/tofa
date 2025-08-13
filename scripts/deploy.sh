#!/bin/bash

# TOFA Website Deployment Script
echo "🚀 Starting TOFA website deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with the required environment variables."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma db push

# Build the application
echo "🏗️ Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "🎉 Ready for deployment!"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "📋 Deployment checklist:"
echo "1. ✅ Dependencies installed"
echo "2. ✅ Prisma client generated"
echo "3. ✅ Database migrations applied"
echo "4. ✅ Application built"
echo ""
echo "🌐 Next steps:"
echo "- Deploy to your hosting platform (Vercel, Netlify, etc.)"
echo "- Set environment variables in your hosting platform"
echo "- Update NEXTAUTH_URL to your production domain"
echo "- Test all functionality in production" 