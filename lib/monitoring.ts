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

