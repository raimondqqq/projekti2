#!/bin/bash

echo "🔐 SECRET ROTATION HELPER"
echo "=========================="
echo ""
echo "Follow these steps to rotate all compromised secrets:"
echo ""

echo "1️⃣  GOOGLE OAUTH2 - Rotate at Google Cloud Console"
echo "   🌐 https://console.cloud.google.com/apis/credentials"
echo "   • Delete old OAuth 2.0 Client"
echo "   • Create new OAuth 2.0 Client ID"
echo "   • Authorized redirect: https://www.theoria.co/api/auth/callback/google"
echo ""
read -p "   Paste NEW Google Client ID: " NEW_GOOGLE_ID
read -p "   Paste NEW Google Client Secret: " NEW_GOOGLE_SECRET
echo ""

echo "2️⃣  POSTGRESQL - Rotate password at Neon Console"
echo "   🌐 https://console.neon.tech"
echo "   • Go to your project → Settings → Reset password"
echo ""
read -p "   Paste NEW Database URL (postgresql://...): " NEW_DB_URL
read -p "   Paste NEW Direct URL (postgresql://...): " NEW_DIRECT_URL
echo ""

echo "3️⃣  VERCEL BLOB - Regenerate token"
echo "   🌐 https://vercel.com/dashboard/stores"
echo "   • Find your Blob store → Regenerate token"
echo ""
read -p "   Paste NEW Blob Token: " NEW_BLOB_TOKEN
echo ""

echo "4️⃣  AUTH_SECRET - Generate new random secret"
NEW_AUTH_SECRET=$(openssl rand -base64 32)
echo "   ✅ Generated: $NEW_AUTH_SECRET"
echo ""

echo "📤 Updating Vercel environment variables..."
echo ""

# Update Vercel env vars
vercel env rm AUTH_GOOGLE_ID production --yes 2>/dev/null
vercel env rm AUTH_GOOGLE_SECRET production --yes 2>/dev/null
vercel env rm AUTH_SECRET production --yes 2>/dev/null
vercel env rm DATABASE_URL production --yes 2>/dev/null
vercel env rm DIRECT_URL production --yes 2>/dev/null
vercel env rm BLOB_READ_WRITE_TOKEN production --yes 2>/dev/null

echo "$NEW_GOOGLE_ID" | vercel env add AUTH_GOOGLE_ID production
echo "$NEW_GOOGLE_SECRET" | vercel env add AUTH_GOOGLE_SECRET production
echo "$NEW_AUTH_SECRET" | vercel env add AUTH_SECRET production
echo "$NEW_DB_URL" | vercel env add DATABASE_URL production
echo "$NEW_DIRECT_URL" | vercel env add DIRECT_URL production
echo "$NEW_BLOB_TOKEN" | vercel env add BLOB_READ_WRITE_TOKEN production

echo ""
echo "✅ All production secrets updated!"
echo ""
echo "📝 Update your local .env.local file:"
echo ""
echo "AUTH_GOOGLE_ID=\"$NEW_GOOGLE_ID\""
echo "AUTH_GOOGLE_SECRET=\"$NEW_GOOGLE_SECRET\""
echo "AUTH_SECRET=\"$NEW_AUTH_SECRET\""
echo "DATABASE_URL=\"$NEW_DB_URL\""
echo "DIRECT_URL=\"$NEW_DIRECT_URL\""
echo "BLOB_READ_WRITE_TOKEN=\"$NEW_BLOB_TOKEN\""
echo ""
echo "🚀 Trigger redeploy: git commit --allow-empty -m 'Redeploy with rotated secrets' && git push"
