# Vantage Documentation

Complete documentation for Vantage Mission Control.

## Setup & Configuration

- [Quick Start Guide](../QUICKSTART.md) - Get up and running in 15 minutes
- [Environment Variables Template](ENV_TEMPLATE.md) - Complete .env.local template
- [Setup Guide](SETUP.md) - Detailed configuration instructions
- [Credentials Checklist](CREDENTIALS_CHECKLIST.md) - Step-by-step credential gathering
- [MCP Setup](MCP_SETUP.md) - Model Context Protocol configuration

## Development

- [Cursor Setup](CURSOR_SETUP.md) - Cursor AI development rules and setup
- [Health Monitoring](HEALTH_MONITORING.md) - Health monitoring feature guide

## Architecture

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Key Concepts

- Server Components by default
- Client Components only when needed (interactivity, hooks, browser APIs)
- Type-safe throughout (no `any` types)
- Design system tokens (no arbitrary values)
- Optimized builds (< 3 minutes)

