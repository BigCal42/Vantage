/**
 * Health score calculation utilities
 * Calculates weighted average of project health metrics
 */

export interface HealthMetrics {
  budget: number
  timeline: number
  resources: number
  stakeholders: number
}

/**
 * Calculates weighted health score from multiple metrics
 * Uses weighted average: budget (30%), timeline (30%), resources (20%), stakeholders (20%)
 */
export function calculateHealthScore(metrics: HealthMetrics): number {
  const weights = {
    budget: 0.3,
    timeline: 0.3,
    resources: 0.2,
    stakeholders: 0.2
  }

  const score =
    metrics.budget * weights.budget +
    metrics.timeline * weights.timeline +
    metrics.resources * weights.resources +
    metrics.stakeholders * weights.stakeholders

  return Math.round(score * 100) / 100
}

