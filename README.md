# Vantage Mission Control

> AI-powered transformation intelligence platform for healthcare systems

## Overview

Vantage replaces $10M in management consulting fees with autonomous AI governance for healthcare transformation projects. Built for CIOs at organizations like Mayo Clinic who need enterprise-grade project intelligence without the overhead.

## Key Features

- **Real-Time Health Monitoring** - Continuous project health scoring with predictive risk detection
- **Automated Executive Briefings** - AI-generated stakeholder-specific reports
- **One-Click Mitigations** - AI-recommended actions with instant execution
- **Ambient Intelligence** - Integrates with Slack, Jira, ServiceNow, and existing tools
- **Zero Setup** - Auto-discovers projects and starts analyzing in 5 minutes

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Environment Variables

Create `.env.local` in the project root with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: GitHub & Vercel (for integrations)
GITHUB_TOKEN=your_github_token
VERCEL_TOKEN=your_vercel_token
VERCEL_PROJECT_ID=your_project_id
```

See [docs/ENV_TEMPLATE.md](docs/ENV_TEMPLATE.md) for complete template.

## Architecture

```
app/                    # Next.js App Router (Server Components by default)
├── page.tsx           # Home page
├── layout.tsx         # Root layout
└── api/               # API routes
components/
├── ui/                # shadcn/ui base components
├── primitives/        # Layout primitives
└── [feature]/         # Feature-specific components
lib/
├── supabase/          # Supabase client/server/middleware helpers
├── data/              # Data access layer
└── utils/             # Utility functions
```

## Key Commands

- `⌘K` / `Ctrl+K` - Command palette
- `⌘⇧D` / `Ctrl+Shift+D` - Open diagnose modal
- `⌘⇧A` / `Ctrl+Shift+A` - Toggle AI agents panel
- `J/K` - Navigate feed (Vim-style)
- `?` - Show keyboard shortcuts

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Testing
```bash
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:ui       # UI mode
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository in Vercel dashboard
3. Set environment variables
4. Deploy automatically

The project is configured for optimal Vercel deployment:
- Standalone build mode
- Optimized webpack configuration
- Memory allocation: 4GB
- Function timeout: 10s

### Build Configuration

- **Build time**: < 3 minutes
- **Bundle size**: Optimized with code-splitting
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with Next.js rules

## Performance

- Sub-200ms interaction feedback
- 60fps animations with GPU acceleration
- Lazy loading for optimal initial load
- Optimistic UI for instant user feedback
- Server Components by default

## Documentation

- [Quick Start Guide](QUICKSTART.md) - 15-minute setup
- [Environment Variables](docs/ENV_TEMPLATE.md) - Complete env template
- [Setup Guide](docs/SETUP.md) - Detailed configuration
- [Health Monitoring](docs/HEALTH_MONITORING.md) - Feature guide
- [MCP Setup](docs/MCP_SETUP.md) - Model Context Protocol configuration

## License

Proprietary - All rights reserved

---

Built with ⚡️ by the Vantage team
