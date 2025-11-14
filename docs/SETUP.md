# Vantage Setup Guide

Complete setup guide for connecting Vantage to GitHub, Vercel, Supabase, and MCP servers.

## Prerequisites

- Node.js 18+ installed
- Git configured
- Cursor IDE installed
- Accounts for: GitHub, Vercel, Supabase

## Quick Start

```bash
# 1. Clone repository (if not already done)
git clone https://github.com/BigCal42/vantage.git
cd vantage

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Configure environment variables (see below)
# Copy example and fill in your credentials
cp .env.example .env.local

# 4. Test connections
npm run test:connections

# 5. Start development server
npm run dev
```

## 1. GitHub Setup

Your repository is already connected! Verify with:

```bash
git remote -v
# Should show: https://github.com/BigCal42/vantage.git
```

### Create Personal Access Token

For MCP server and API access:

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Name it: `Vantage MCP Access`
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
   - ✅ `read:org` (Read org data)
5. Click **"Generate token"**
6. Copy the token (starts with `ghp_`)
7. Add to `.env.local`:
   ```
   GITHUB_TOKEN=ghp_your_token_here
   ```

## 2. Vercel Setup

### Install Vercel CLI

Already installed! Verify:

```bash
vercel --version
```

### Authenticate with Vercel

```bash
vercel login
# Opens browser for authentication
```

### Link Project to Vercel

```bash
vercel link
# Select "Link to existing project"
# Choose "vantage"
```

### Get Vercel Credentials

1. **Get Project ID:**
   ```bash
   vercel project ls
   # Copy your project ID
   ```

2. **Get Organization ID:**
   ```bash
   vercel teams ls
   # Copy your team/org ID
   ```

3. **Create API Token:**
   - Go to https://vercel.com/account/tokens
   - Click **"Create Token"**
   - Name: `Vantage API Access`
   - Scope: Full Access (or limit to your project)
   - Copy the token

4. **Add to `.env.local`:**
   ```
   VERCEL_TOKEN=your_token_here
   VERCEL_PROJECT_ID=prj_your_project_id
   VERCEL_ORG_ID=team_your_org_id
   ```

### Configure Vercel Integration

1. Go to Vercel Dashboard → Your Project → Settings
2. **Git Integration:**
   - Connect to your GitHub repository
   - Enable automatic deployments
   - Production Branch: `main` or `vantage-p1`

3. **Environment Variables:**
   ```bash
   # Sync Supabase variables to Vercel (after setting them up)
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   ```

## 3. Supabase Setup

### Install Supabase CLI

Use via npx (no installation needed):

```bash
npx supabase --version
```

### Create Supabase Project

If you haven't created the "vantage" project yet:

1. Go to https://app.supabase.com
2. Click **"New project"**
3. Project name: `vantage`
4. Database password: (save this securely!)
5. Region: Choose closest to your users
6. Click **"Create new project"**

### Get Supabase Credentials

1. Go to your project dashboard
2. Click **Settings** (gear icon) → **API**

3. Copy these values:
   - **Project URL:** `https://[project-ref].supabase.co`
   - **anon/public key:** `eyJhbGciOiJI...`
   - **service_role key:** `eyJhbGciOiJI...` (keep secret!)

4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### Get Database Connection String

1. Go to **Settings** → **Database**
2. Scroll to **Connection string**
3. Choose **"URI"** tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password
6. Add to `.env.local`:
   ```
   SUPABASE_DB_URL=postgresql://postgres:your_password@db.project-ref.supabase.co:5432/postgres
   ```

### Link Supabase to GitHub

1. In Supabase Dashboard → **Settings** → **Integrations**
2. Find **GitHub** integration
3. Click **"Connect"** or **"Install"**
4. Authorize Supabase to access your GitHub account
5. Select the `vantage` repository
6. This enables:
   - Automatic database branching
   - Migration tracking
   - Branch previews

### Link Supabase CLI to Project

```bash
npx supabase login
# Opens browser for authentication

npx supabase link --project-ref your-project-ref
# Links local CLI to your Supabase project
```

### Run migrations & seed data

The repository ships with a migrations pipeline under `supabase/migrations/`.

```bash
# Apply migrations to linked project
npm run db:push

# Seed demo records (projects, metrics, stakeholders)
npm run db:seed
```

> Tip: `db:push` uses the Supabase CLI, so make sure `supabase link` has been executed first.

### Install Supabase Vercel Integration

1. Go to https://vercel.com/integrations/supabase
2. Click **"Add Integration"**
3. Select your Vercel project: `vantage`
4. Select your Supabase project: `vantage`
5. This automatically syncs environment variables!

## 4. MCP Server Configuration

See [MCP_SETUP.md](./MCP_SETUP.md) for detailed instructions.

**Quick Summary:**

1. Open Cursor settings:
   - Windows: `C:\Users\roryc\AppData\Roaming\Cursor\User\settings.json`
   - Mac: `~/Library/Application Support/Cursor/User/settings.json`

2. Add MCP server configuration (see MCP_SETUP.md for full config)

3. Restart Cursor completely

4. Verify MCP servers are loaded (check status bar)

## 5. Environment Variables Summary

Create `.env.local` with these variables:

```bash
# GitHub
GITHUB_TOKEN=ghp_your_github_token
GITHUB_REPO=vantage
GITHUB_OWNER=BigCal42

# Vercel
VERCEL_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=prj_your_project_id
VERCEL_ORG_ID=team_your_org_id

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DB_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres

# General
NODE_ENV=development
```

## 6. Testing Connections

Run the connection test suite:

```bash
npm run test:connections
```

This will test:
- ✅ GitHub API access
- ✅ Vercel API access
- ✅ Supabase database connection
- ℹ️ MCP server configuration

Expected output:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  VANTAGE CONNECTION TEST SUITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Testing GitHub Connection...
✅ GitHub: Connected to BigCal42/vantage

🔍 Testing Vercel Connection...
✅ Vercel: Authenticated as your-username

🔍 Testing Supabase Connection...
✅ Supabase: Connected successfully

🔍 Testing MCP Servers...
ℹ️  MCP servers must be configured in Cursor settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All configured services connected successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 7. Development Workflow

### Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

### Deploy to Vercel

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

Or push to GitHub and Vercel auto-deploys!

### Database Migrations

```bash
# Create migration
npx supabase migration new migration_name

# Apply migrations locally
npx supabase db reset

# Push to remote (same as npm run db:push)
npm run db:push

# Seed demo data
npm run db:seed
```

### Deployment verification

After Vercel deploys, run a smoke test against the built-in health endpoint:

```bash
curl --fail https://<your-preview-domain>/api/health
```

You should receive a JSON payload with status `ok` and a timestamp.

## 8. Troubleshooting

### "Module not found" errors

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Vercel deployment fails

1. Check environment variables in Vercel dashboard
2. Verify build command: `npm run build`
3. Check logs: `vercel logs`

### Supabase connection timeout

1. Verify credentials in `.env.local`
2. Check Supabase project is active
3. Try using connection pooler URL
4. Check firewall settings

### MCP servers not loading

1. Verify settings.json syntax (valid JSON)
2. Restart Cursor completely
3. Check Node.js version: `node --version` (should be 18+)
4. Check npx works: `npx --version`

## 9. Next Steps

- [ ] Set up database schema in Supabase
- [ ] Configure Row Level Security (RLS)
- [ ] Set up authentication
- [ ] Add API routes for backend logic
- [ ] Configure email notifications
- [ ] Set up monitoring and analytics

## 10. Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [Vantage Repository](https://github.com/BigCal42/vantage)

## Getting Help

- Issues: https://github.com/BigCal42/vantage/issues
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- MCP Discord: https://discord.gg/modelcontextprotocol

---

**Built with ⚡️ by the Vantage team**

