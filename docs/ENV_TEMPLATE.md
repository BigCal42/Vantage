# Environment Variables Template

Copy this content to create your `.env.local` file:

```bash
# ============================================
# VANTAGE ENVIRONMENT CONFIGURATION
# ============================================
# Copy this to .env.local and fill in your actual credentials
# Never commit .env.local to version control!

# ============================================
# GitHub Configuration
# ============================================
# Get token from: https://github.com/settings/tokens
# Required scopes: repo, workflow, read:org
GITHUB_TOKEN=ghp_your_github_personal_access_token_here
GITHUB_REPO=vantage
GITHUB_OWNER=BigCal42

# ============================================
# Vercel Configuration
# ============================================
# Get token from: https://vercel.com/account/tokens
# Get project/org IDs from: vercel project ls && vercel teams ls
VERCEL_TOKEN=your_vercel_api_token_here
VERCEL_PROJECT_ID=prj_S1hxyqy8Uc6nr0iZgBPVG7Z3PeeT
VERCEL_ORG_ID=team_your_vercel_org_id

# ============================================
# Supabase Configuration
# ============================================
# Get from: https://app.supabase.com/project/_/settings/api
# Project Reference: pxxorhixbsbsonjaygkb
NEXT_PUBLIC_SUPABASE_URL=https://xndisymquphjencoyrbb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Database connection string (from Settings > Database)
# Replace [YOUR-PASSWORD] with your actual database password
SUPABASE_DB_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xndisymquphjencoyrbb.supabase.co:5432/postgres

# ============================================
# General Configuration
# ============================================
NODE_ENV=development
```

## How to Use

1. Create a new file named `.env.local` in the project root
2. Copy the template above into the file
3. Replace all placeholder values with your actual credentials
4. Save the file
5. Restart your development server if it's running

## Where to Get Each Credential

### GitHub Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `workflow`, `read:org`
4. Copy the generated token (starts with `ghp_`)

### Vercel Credentials
```bash
# Login first
vercel login

# Get project ID
vercel project ls

# Get organization ID
vercel teams ls

# Create API token at:
# https://vercel.com/account/tokens
```

### Supabase Credentials
1. Go to your project at https://app.supabase.com
2. Navigate to Settings → API
3. Copy Project URL and API keys
4. Navigate to Settings → Database
5. Copy Connection String (replace password)

## Verification

After creating `.env.local`, test your connections:

```bash
npm run test:connections
```

You should see:
- ✅ GitHub: Connected
- ✅ Vercel: Authenticated
- ✅ Supabase: Connected successfully

