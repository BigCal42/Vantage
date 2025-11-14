# Credentials Checklist for Vantage

Use this checklist to gather all required credentials for setting up Vantage.

## ✅ Checklist

### 1. GitHub Credentials

- [ ] **Personal Access Token Created**
  - URL: https://github.com/settings/tokens
  - Token name: `Vantage MCP Access`
  - Scopes: `repo`, `workflow`, `read:org`
  - Token: `ghp_____________________________`

### 2. Vercel Credentials

- [ ] **Vercel CLI Installed**
  ```bash
  vercel --version
  ```

- [ ] **Authenticated with Vercel**
  ```bash
  vercel login
  vercel whoami
  ```

- [ ] **Project Linked**
  ```bash
  vercel link
  ```

- [ ] **API Token Created**
  - URL: https://vercel.com/account/tokens
  - Token name: `Vantage API Access`
  - Token: `_____________________________`

- [ ] **Project ID Retrieved**
  ```bash
  vercel project ls
  ```
  - Project ID: `prj_____________________________`

- [ ] **Organization ID Retrieved**
  ```bash
  vercel teams ls
  ```
  - Org ID: `team_____________________________`

### 3. Supabase Credentials

- [ ] **Supabase Project Created**
  - Project name: `vantage`
  - Region: `_______________`
  - Database password saved: ✅

- [ ] **API Credentials Retrieved**
  - URL: https://app.supabase.com/project/_/settings/api
  - Project URL: `https://__________.supabase.co`
  - Anon/Public Key: `eyJ_____________________________`
  - Service Role Key: `eyJ_____________________________`

- [ ] **Database Connection String Retrieved**
  - URL: https://app.supabase.com/project/_/settings/database
  - Connection String: `postgresql://postgres:__________@db.__________.supabase.co:5432/postgres`

- [ ] **Supabase CLI Authenticated**
  ```bash
  npx supabase login
  npx supabase link --project-ref your-project-ref
  ```

- [ ] **GitHub Integration Enabled**
  - In Supabase: Settings → Integrations → GitHub
  - Repository connected: `BigCal42/vantage`

- [ ] **Vercel Integration Enabled**
  - In Vercel: Integrations → Supabase
  - Project linked

### 4. MCP Server Configuration

- [ ] **Cursor Settings.json Located**
  - Windows: `C:\Users\roryc\AppData\Roaming\Cursor\User\settings.json`
  - Mac: `~/Library/Application Support/Cursor/User/settings.json`

- [ ] **MCP Configuration Added**
  - See `mcp-config.json` for template
  - GitHub token added
  - Filesystem path set
  - Postgres connection string added

- [ ] **Cursor Restarted**
  - Close Cursor completely
  - Reopen and verify MCP servers loaded

### 5. Environment Files

- [ ] **.env.local Created**
  ```bash
  cp .env.example .env.local
  ```

- [ ] **All Credentials Added to .env.local**
  - [ ] GITHUB_TOKEN
  - [ ] VERCEL_TOKEN
  - [ ] VERCEL_PROJECT_ID
  - [ ] VERCEL_ORG_ID
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
  - [ ] SUPABASE_DB_URL

- [ ] **Vercel Environment Variables Set**
  ```bash
  vercel env add NEXT_PUBLIC_SUPABASE_URL production
  vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
  vercel env add SUPABASE_SERVICE_ROLE_KEY production
  ```

### 6. Testing

- [ ] **Connection Test Passed**
  ```bash
  npm run test:connections
  ```

- [ ] **Development Server Runs**
  ```bash
  npm run dev
  ```
  - Accessible at: http://localhost:3000

- [ ] **Build Succeeds**
  ```bash
  npm run build
  ```

- [ ] **Vercel Deployment Works**
  ```bash
  vercel
  ```

- [ ] **MCP Servers Accessible**
  - Ask AI: "What files are in my repository?"
  - Ask AI: "Query my Supabase database"

## 📝 Quick Reference

### GitHub Token Scopes
```
✅ repo               - Full repository access
✅ workflow           - GitHub Actions workflow access
✅ read:org           - Read organization data
```

### Vercel Environment Variables Location
```
Dashboard → Project → Settings → Environment Variables
```

### Supabase Dashboard Sections
```
API Settings:     Settings → API
Database:         Settings → Database
Integrations:     Settings → Integrations
```

### MCP Server Status
```
Check Cursor status bar for MCP indicators
Command Palette: "MCP" to see available tools
```

## 🚨 Security Notes

- ✅ Never commit `.env.local` to git (already in .gitignore)
- ✅ Never share service role keys publicly
- ✅ Use environment variables for all secrets
- ✅ Rotate credentials regularly
- ✅ Use minimal required permissions/scopes
- ✅ Store database passwords in password manager

## ⚡ Quick Commands

```bash
# Test all connections
npm run test:connections

# Start development
npm run dev

# Deploy to Vercel
vercel --prod

# Check Vercel status
vercel whoami
vercel project ls

# Check Supabase status
npx supabase projects list
npx supabase db dump

# Git operations
git status
git pull
git push
```

## 📞 Support

If you encounter issues:

1. Check this checklist - did you miss a step?
2. Run `npm run test:connections` to diagnose
3. Check documentation in `docs/SETUP.md`
4. Review MCP setup in `docs/MCP_SETUP.md`
5. Check service status pages:
   - GitHub: https://www.githubstatus.com
   - Vercel: https://www.vercel-status.com
   - Supabase: https://status.supabase.com

---

**Once all boxes are checked, you're ready to build! 🚀**

