# Vantage Setup Super Prompt for Cursor

Copy this entire prompt into Cursor Composer to set up Vantage from scratch with Guillermo Rauch standards.

---

## 🎯 Mission: Get Vantage Production-Ready

You are setting up **Vantage Mission Control** - the AI-powered transformation intelligence platform that replaces $10M in management consulting fees. Follow these steps precisely to ensure flawless deployment.

---

## 📋 Phase 1: Repository Setup

### Initialize Project Structure

```bash
# Verify we have the correct structure
ls -la

# Should see:
# app/
# components/
# lib/
# public/
# .cursorrules
# next.config.mjs
# package.json
# README.md
```

### GitHub Configuration

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: TypeScript Check
        run: npx tsc --noEmit
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
        env:
          SKIP_ENV_VALIDATION: true

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://vantage-preview.vercel.app
          uploadArtifacts: true
```

Create `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## 🎯 What does this PR do?

Brief description of changes

## 🧪 How to test

1. Steps to verify changes
2. Expected behavior

## ✅ Checklist

- [ ] TypeScript compiles with no errors
- [ ] Responsive on mobile (375px width tested)
- [ ] Keyboard accessible (tab navigation works)
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] No console errors
- [ ] Follows design system (spacing, typography, colors)
- [ ] Performance: No layout shift, <200ms interactions

## 📸 Screenshots

(if applicable)
```

### Git Hygiene

Create `.gitattributes`:

```
* text=auto eol=lf
*.{cmd,[cC][mM][dD]} text eol=crlf
*.{bat,[bB][aA][tT]} text eol=crlf

# Binary files
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.mov binary
*.mp4 binary
*.mp3 binary
*.flv binary
*.fla binary
*.swf binary
*.gz binary
*.zip binary
*.7z binary
*.ttf binary
*.eot binary
*.woff binary
*.woff2 binary
*.pyc binary
*.pdf binary
*.ez binary
*.bz2 binary
*.swp binary
```

Update `.gitignore`:

```
# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage
*.lcov

# next.js
.next
out
build
dist

# production
.vercel

# env files
.env
.env*.local
.env.production

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local dev
.DS_Store
*.pem
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json

# typescript
*.tsbuildinfo
next-env.d.ts

# Cursor
.cursor
.cursorignore
```

---

## 🗄️ Phase 2: Supabase Setup

### Create Supabase Project

1. Go to [database.new](https://database.new)
2. Create project: "vantage-production"
3. Save credentials to password manager
4. Enable Realtime in Settings → API

### Database Schema

Create `supabase/schema.sql`:

```sql
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Projects table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  health_score numeric(5,2) default 0,
  budget_velocity numeric(5,2) default 0,
  timeline_confidence numeric(5,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Health metrics table (time-series data)
create table public.health_metrics (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  health_score numeric(5,2) not null,
  budget_velocity numeric(5,2),
  resource_gaps integer,
  vendor_risks integer,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Risks table
create table public.risks (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  description text,
  severity text check (severity in ('low', 'medium', 'high', 'critical')),
  probability numeric(5,2),
  impact_score numeric(10,2),
  status text default 'open' check (status in ('open', 'monitoring', 'mitigated', 'closed')),
  detected_at timestamp with time zone default timezone('utc'::text, now()) not null,
  mitigated_at timestamp with time zone
);

-- Decisions table
create table public.decisions (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  description text,
  urgency text check (urgency in ('low', 'medium', 'high')),
  impact_score numeric(10,2),
  options jsonb,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'deferred')),
  decided_by text,
  decided_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Stakeholders table
create table public.stakeholders (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  name text not null,
  role text not null,
  email text,
  engagement_score numeric(5,2) default 50,
  sentiment text check (sentiment in ('positive', 'neutral', 'negative')),
  last_interaction timestamp with time zone
);

-- Briefings table
create table public.briefings (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  stakeholder_id uuid references public.stakeholders(id) on delete cascade,
  content text not null,
  format text check (format in ('email', 'pdf', 'pptx')),
  sent_at timestamp with time zone default timezone('utc'::text, now()) not null,
  opened_at timestamp with time zone,
  read_duration integer
);

-- Actions table (AI-generated mitigations)
create table public.actions (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  risk_id uuid references public.risks(id) on delete set null,
  title text not null,
  description text,
  action_type text check (action_type in ('email', 'calendar', 'slack', 'jira')),
  success_rate numeric(5,2),
  cost numeric(10,2),
  status text default 'suggested' check (status in ('suggested', 'approved', 'executing', 'completed', 'failed')),
  executed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.projects enable row level security;
alter table public.health_metrics enable row level security;
alter table public.risks enable row level security;
alter table public.decisions enable row level security;
alter table public.stakeholders enable row level security;
alter table public.briefings enable row level security;
alter table public.actions enable row level security;

-- Create policies (for now, allow all - add auth later)
create policy "Allow all operations" on public.projects for all using (true);
create policy "Allow all operations" on public.health_metrics for all using (true);
create policy "Allow all operations" on public.risks for all using (true);
create policy "Allow all operations" on public.decisions for all using (true);
create policy "Allow all operations" on public.stakeholders for all using (true);
create policy "Allow all operations" on public.briefings for all using (true);
create policy "Allow all operations" on public.actions for all using (true);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add trigger to projects
create trigger set_updated_at
  before update on public.projects
  for each row
  execute function public.handle_updated_at();

-- Create indexes for performance
create index idx_health_metrics_project_id on public.health_metrics(project_id);
create index idx_health_metrics_recorded_at on public.health_metrics(recorded_at desc);
create index idx_risks_project_id on public.risks(project_id);
create index idx_risks_severity on public.risks(severity);
create index idx_decisions_project_id on public.decisions(project_id);
create index idx_decisions_status on public.decisions(status);
create index idx_stakeholders_project_id on public.stakeholders(project_id);
create index idx_briefings_project_id on public.briefings(project_id);
create index idx_actions_project_id on public.actions(project_id);
```

### Seed Data

Create `supabase/seed.sql`:

```sql
-- Insert demo project
insert into public.projects (name, description, health_score, budget_velocity, timeline_confidence)
values (
  'Epic EHR Implementation - Mayo Clinic',
  'Enterprise-wide Electronic Health Record system implementation across 47 facilities',
  87.3,
  15.2,
  73.0
) returning id;

-- Get the project ID (replace with actual UUID after running above)
-- For demo, we'll use a fixed UUID
insert into public.health_metrics (project_id, health_score, budget_velocity, resource_gaps, vendor_risks)
select 
  p.id,
  87.3 + (random() * 5 - 2.5),
  15.2 + (random() * 3 - 1.5),
  floor(random() * 5)::integer,
  floor(random() * 3)::integer
from public.projects p
limit 1;

-- Insert sample risks
insert into public.risks (project_id, title, description, severity, probability, impact_score)
select 
  p.id,
  'Vendor Resource Constraint',
  'Epic implementation team showing 23% increase in timeline estimates, suggesting capacity issues',
  'high',
  0.68,
  2400000.00
from public.projects p
limit 1;

-- Insert sample decisions
insert into public.decisions (project_id, title, description, urgency, impact_score)
select 
  p.id,
  'Accelerate Phase 3 Go-Live',
  'Option to move Phase 3 deployment forward by 6 weeks to capture $2.4M in annual savings',
  'high',
  2400000.00
from public.projects p
limit 1;

-- Insert stakeholders
insert into public.stakeholders (project_id, name, role, email, engagement_score, sentiment)
select 
  p.id,
  name,
  role,
  email,
  engagement,
  sentiment
from public.projects p
cross join (
  values
    ('Dr. Sarah Chen', 'Chief Medical Officer', 'schen@mayo.edu', 92, 'positive'),
    ('Michael Torres', 'CFO', 'mtorres@mayo.edu', 78, 'neutral'),
    ('James Wilson', 'CIO', 'jwilson@mayo.edu', 95, 'positive')
) as s(name, role, email, engagement, sentiment)
limit 3;
```

### Supabase Client Setup

Create `lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

Create `lib/supabase/server.ts`:

```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle middleware context where cookies are read-only
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle middleware context where cookies are read-only
          }
        },
      },
    }
  )
}
```

### Environment Variables

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI (will be provided by Vercel AI Gateway by default)
# Only needed if using direct API calls
# OPENAI_API_KEY=your_openai_key
```

Create `.env.example`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# AI Configuration (optional - Vercel AI Gateway provides by default)
# OPENAI_API_KEY=sk-...
```

---

## ⚙️ Phase 3: Vercel Configuration

### Create `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

### Update `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Strict type checking
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint during builds
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### Vercel Environment Variables Setup

In Vercel Dashboard → Project Settings → Environment Variables, add:

**Production:**

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-key
NODE_ENV=production
```

**Preview:**

```
NEXT_PUBLIC_SUPABASE_URL=https://your-staging-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-staging-key
NODE_ENV=preview
```

**Development:**

```
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-key
NODE_ENV=development
```

---

## 🎨 Phase 4: Design System Verification

### Verify Design Tokens

Check `app/globals.css` has:

```css
@theme inline {
  /* Spacing - 4px base system */
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  
  /* Colors - Trust Blue system */
  --color-primary: #0066FF;
  --color-background: #0A0A0A;
  --color-surface: #1A1A1A;
  --color-border: rgba(255, 255, 255, 0.1);
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  
  /* Animation */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Component Checklist

Verify these components exist and follow standards:

- [ ] `components/mission-control-hero.tsx` - Main dashboard
- [ ] `components/live-health-monitor.tsx` - Real-time health
- [ ] `components/executive-briefing-engine.tsx` - Briefing generation
- [ ] `components/floating-context-pill.tsx` - Always-visible status
- [ ] `components/command-palette.tsx` - Cmd+K navigation
- [ ] All use design tokens (spacing-4, text-base, etc.)
- [ ] All have proper TypeScript types
- [ ] All have loading states
- [ ] All are responsive (mobile-first)

---

## 🚀 Phase 5: Deployment Checklist

### Pre-Deploy Verification

```bash
# 1. Type check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Build locally
npm run build

# 4. Test production build
npm run start

# 5. Verify no console errors
# Open localhost:3000 and check browser console
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Post-Deploy Verification

- [ ] Visit production URL
- [ ] Check Lighthouse score >90
- [ ] Test on mobile device
- [ ] Verify Supabase connection
- [ ] Test command palette (Cmd+K)
- [ ] Verify real-time health updates
- [ ] Test briefing generation
- [ ] Check console for errors
- [ ] Verify all images load
- [ ] Test keyboard navigation

---

## 📊 Phase 6: Monitoring Setup

### Vercel Analytics

1. Go to Vercel Dashboard → Analytics
2. Enable Web Vitals tracking
3. Set performance budgets:
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

### Supabase Monitoring

1. Go to Supabase Dashboard → Reports
2. Enable database insights
3. Set up alerts for:
   - Connection pool exhaustion
   - Slow queries (>1s)
   - High error rate

### Create `lib/monitoring.ts`

```typescript
import { Analytics } from '@vercel/analytics/react'

export function trackEvent(name: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.va?.track(name, properties)
  }
}

export function trackBriefingGenerated(stakeholder: string) {
  trackEvent('briefing_generated', { stakeholder })
}

export function trackDecisionMade(decisionId: string, action: string) {
  trackEvent('decision_made', { decisionId, action })
}

export function trackHealthScoreChange(from: number, to: number) {
  trackEvent('health_score_change', { from, to, delta: to - from })
}
```

### Observability checklist

- **Supabase logs**: Settings → Logs → Enable ingestion for authentication + Postgres.
- **Vercel Analytics dashboards**: Pin Vantage project dashboard and enable Slack alerts for Core Web Vitals regressions.
- **On-call notifications**: Update `lib/notifications/` adapters with real Slack webhook + email provider once credentials are available.
- **Smoke tests**: `/api/health` is hit automatically via CI (`smoke-test` job). Monitor artifact for failures.

---

## ✅ Success Criteria

Your setup is complete when:

1. **GitHub Actions pass** - All CI checks green
2. **Vercel build succeeds** - No build errors
3. **Lighthouse score >90** - Performance, accessibility, best practices
4. **Supabase connected** - Database queries work
5. **Real-time updates work** - Health score updates live
6. **Mobile responsive** - Works on 375px width
7. **Keyboard accessible** - Can navigate with Tab
8. **No console errors** - Clean browser console
9. **Fast interactions** - <200ms response time
10. **Professional appearance** - Mayo Clinic CIO would be impressed

---

## 🎯 Final Validation

Run this checklist before considering setup complete:

```bash
# 1. Clone repo fresh
git clone <your-repo-url>
cd vantage

# 2. Install
npm install

# 3. Add env vars
cp .env.example .env.local
# (Fill in real values)

# 4. Run migrations
# In Supabase SQL editor, run schema.sql then seed.sql

# 5. Build
npm run build

# 6. Start
npm run start

# 7. Test in browser
open http://localhost:3000

# 8. Deploy
vercel --prod
```

---

## 🚢 You're Ready to Ship

You now have:

- ✅ Production-grade database schema
- ✅ Proper Supabase client setup
- ✅ Vercel deployment optimized
- ✅ GitHub Actions CI/CD
- ✅ Monitoring and analytics
- ✅ Security headers configured
- ✅ Performance optimizations
- ✅ Professional design system

**Go replace some consultants. 🚀**

