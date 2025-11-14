# Health Monitoring Playbook

This guide explains how Vantage ingests, stores, and visualises project health metrics.

## Data Sources

| Source | Table | Description |
|--------|-------|-------------|
| Supabase | `projects` | Canonical record for each transformation initiative |
| Supabase | `health_metrics` | Time-series data for health, budget velocity, resource gaps, vendor risks |
| API | `POST /api/projects/[id]/health` | Endpoint to push new health snapshots |

## Publishing Metrics

Use the `/api/projects/[id]/health` route to append new readings:

```bash
curl -X POST https://your-domain/api/projects/<project-id>/health \
  -H "Content-Type: application/json" \
  -d '{
    "healthScore": 86.5,
    "budgetVelocity": 12.4,
    "resourceGaps": 3,
    "vendorRisks": 1
  }'
```

All writes are persisted to `health_metrics` and rendered in the Mission Control dashboard + Live Health Monitor component.

## KPIs & Thresholds

- **Health Score**: 0–100. ≥85 is “Excellent”, 70–84 “Healthy”, <70 “Needs Attention”.
- **Budget Velocity**: % delta vs plan. >20 triggers warning.
- **Resource Gaps**: Number of missing roles. >4 triggers critical status.
- **Vendor Risks**: Count of active vendor issues. ≥3 triggers critical status.

## Troubleshooting

1. **No data in UI**
   - Confirm `npm run db:seed` or `/api/projects/{id}/health` has been called.
   - Check Supabase table `health_metrics` for records.
2. **API errors**
   - Ensure payload matches schema (see `app/api/projects/[id]/health/route.ts`).
   - Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set.
3. **Stale metrics**
   - Health monitor polls the newest record; push a new snapshot to refresh.
   - Check CI smoke test hitting `/api/health` succeeds.

## Observability

- Supabase Dashboard → Reports: watch query latency for `health_metrics`.
- Vercel Analytics: track user interactions with `trackHealthScoreChange` (extend as required).

