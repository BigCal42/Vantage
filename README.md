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
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Command Palette**: cmdk

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Architecture

- `/app` - Next.js App Router pages and layouts
- `/components` - React components (primitives, features, UI)
- `/lib` - Utility functions and design tokens
- `/public` - Static assets

## Key Commands

- `⌘K` - Command palette
- `⌘⇧D` - Open diagnose modal
- `⌘⇧A` - Toggle AI agents panel
- `J/K` - Navigate feed (Vim-style)
- `?` - Show keyboard shortcuts

## Environment Variables

No environment variables required for demo mode. For production:

\`\`\`env
# Add your integration keys here
\`\`\`

## Performance

- Sub-200ms interaction feedback
- 60fps animations with GPU acceleration
- Lazy loading for optimal initial load
- Optimistic UI for instant user feedback

## License

Proprietary - All rights reserved

---

Built with ⚡️ by the Vantage team
