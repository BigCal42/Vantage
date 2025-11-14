# Vantage

> Enterprise transformation intelligence powered by AI

Vantage is an AI-powered platform that provides real-time project health monitoring, predictive risk detection, and automated decision support for large-scale transformation initiatives in healthcare systems.

## Features

- **Real-Time Health Monitoring** - Continuous project health scoring with 6-week predictive risk detection
- **Automated Executive Briefings** - AI-generated, stakeholder-specific reports delivered instantly
- **One-Click Mitigations** - AI-recommended actions with automated execution workflows
- **Ambient Intelligence** - Seamless integration with existing tools (Slack, Jira, ServiceNow)
- **Zero-Setup Deployment** - Auto-discovery and analysis begins in minutes

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router and React Server Components
- **Language**: TypeScript (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL with real-time subscriptions)
- **Deployment**: [Vercel](https://vercel.com/) (Edge Functions + CDN)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm
- Supabase account (for database)
- Vercel account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/BigCal42/Vantage.git
cd Vantage

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Required environment variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check

# Run linter
npm run lint
```

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BigCal42/Vantage)

Or manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Setup

Ensure all required environment variables are configured in your Vercel project settings before deployment.

## Architecture

- **App Router**: Server-first architecture with React Server Components
- **Real-time Updates**: Supabase subscriptions for live data
- **Edge Computing**: API routes deployed to Vercel Edge Functions
- **Optimistic UI**: Instant feedback with automatic rollback on errors
- **Type Safety**: End-to-end TypeScript with strict mode

## Performance

- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 2.5s
- **Lighthouse Score**: 95+
- **Core Web Vitals**: All green

## Security

- Row Level Security (RLS) enabled on all database tables
- Environment variables for sensitive data
- HTTPS-only in production
- Content Security Policy headers
- Regular dependency updates

## License

Proprietary and confidential. Unauthorized copying or distribution of this software is strictly prohibited.

## Support

For enterprise inquiries and support:
- Email: support@vantage-platform.com
- Documentation: [docs.vantage-platform.com](https://docs.vantage-platform.com)

---

Built with ❤️ for healthcare transformation leaders
