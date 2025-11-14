# Vantage Quick Start Guide

Get Vantage connected to all services in 15 minutes.

## ⚡ Prerequisites Check

```bash
# Verify you have these installed:
git --version    # Should show 2.x+
node --version   # Should show 18.x+
npm --version    # Should show 9.x+
vercel --version # Should show 48.x+ (already installed ✅)
```

## 🚀 5-Step Setup

### Step 1: Get Your Credentials (5 min)

Open these tabs in your browser:

1. **GitHub Token:** https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Scopes: `repo`, `workflow`, `read:org`
   - Copy token → Save it

2. **Vercel Setup:**
   ```bash
   vercel login
   vercel link  # Select "Link to existing project" → "vantage"
   ```
   - **Get Token:** https://vercel.com/account/tokens → Create token
   - **Get IDs:** Run `vercel project ls` and `vercel teams ls`

3. **Supabase:** https://app.supabase.com/project/vantage/settings/api
   - Copy: Project URL, anon key, service_role key
   - Go to Settings → Database → Copy connection string

### Step 2: Create .env.local (2 min)

Create `.env.local` in project root:

```bash
# GitHub
GITHUB_TOKEN=ghp_YOUR_TOKEN
GITHUB_REPO=vantage
GITHUB_OWNER=BigCal42

# Vercel
VERCEL_TOKEN=YOUR_VERCEL_TOKEN
VERCEL_PROJECT_ID=prj_YOUR_PROJECT_ID
VERCEL_ORG_ID=team_YOUR_ORG_ID

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
SUPABASE_DB_URL=postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres

NODE_ENV=development
```

### Step 3: Configure MCP Servers (3 min)

1. Open: `C:\Users\roryc\AppData\Roaming\Cursor\User\settings.json`

2. Copy content from `mcp-config.json` into your `settings.json`

3. Replace placeholders:
   - `ghp_your_github_token_here` → Your GitHub token
   - `[YOUR-PASSWORD]` → Your Supabase database password
   - `[project-ref]` → Your Supabase project reference

4. **Restart Cursor** (close completely, then reopen)

### Step 4: Test Everything (2 min)

```bash
npm run test:connections
```

Expected output:
```
✅ GitHub: Connected to BigCal42/vantage
✅ Vercel: Authenticated as [your-username]
✅ Supabase: Connected successfully
ℹ️  MCP Servers: Please verify in Cursor settings
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All configured services connected successfully!
```

### Step 5: Start Building (1 min)

```bash
npm run dev
```

Open http://localhost:3000 🎉

## ✅ Verification Checklist

After setup, verify:

- [ ] `npm run test:connections` shows all ✅
- [ ] MCP servers appear in Cursor status bar
- [ ] `npm run dev` starts without errors
- [ ] Can ask AI: "What files are in my repository?"
- [ ] Can push code: `git push` (should work)
- [ ] Can deploy: `vercel` (should work)

## 🆘 Quick Fixes

### Test shows ❌ for a service?
- Double-check credentials in `.env.local`
- Ensure no extra spaces or quotes
- Verify tokens haven't expired

### MCP servers not showing?
- Check `settings.json` syntax (use a JSON validator)
- Ensure Cursor was fully restarted
- Run `npx --version` to verify npx works

### Vercel login not working?
- Try: `vercel logout` then `vercel login` again
- Check browser isn't blocking the auth popup

### npm install errors?
- Use: `npm install --legacy-peer-deps`
- This is due to React 19 compatibility

## 📚 Next Steps

1. **Set up database schema:** See Supabase docs
2. **Configure authentication:** `npx supabase init`
3. **Add API routes:** Create files in `app/api/`
4. **Deploy to production:** `vercel --prod`

## 📖 Full Documentation

- **Production Setup:** [CURSOR_SETUP.md](CURSOR_SETUP.md) - Complete production-grade setup guide
- **Detailed Setup:** [docs/SETUP.md](docs/SETUP.md)
- **MCP Configuration:** [docs/MCP_SETUP.md](docs/MCP_SETUP.md)
- **Credentials Checklist:** [docs/CREDENTIALS_CHECKLIST.md](docs/CREDENTIALS_CHECKLIST.md)
- **Environment Variables:** [docs/ENV_TEMPLATE.md](docs/ENV_TEMPLATE.md)

## 🎯 Integration Status

Current status of your integrations:

| Service | Status | Next Action |
|---------|--------|-------------|
| **GitHub** | ✅ Connected | Repository already linked |
| **Vercel** | ⚠️ Needs auth | Run `vercel login` |
| **Supabase** | ⚠️ Needs config | Add credentials to `.env.local` |
| **MCP Servers** | ⚠️ Needs config | Add to Cursor settings |

## 💡 Pro Tips

1. **Use the connection test** after any config changes
2. **Restart Cursor** after modifying MCP settings
3. **Use `--legacy-peer-deps`** for npm commands
4. **Keep credentials secure** - never commit `.env.local`
5. **Sync env vars to Vercel** using `vercel env add`

## 🔗 Quick Links

- [GitHub Repo](https://github.com/BigCal42/vantage)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://app.supabase.com)
- [Create GitHub Token](https://github.com/settings/tokens)
- [Create Vercel Token](https://vercel.com/account/tokens)

---

**Need help?** Check [docs/SETUP.md](docs/SETUP.md) or open an issue on GitHub.

**Ready to build?** Run `npm run dev` and start coding! 🚀

