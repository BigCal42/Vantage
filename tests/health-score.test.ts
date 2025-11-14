import { describe, it, expect } from 'vitest'
import { calculateHealthScore } from '@/lib/utils/health'

describe('Health Score Calculation', () => {
  it('calculates weighted average correctly', () => {
    const metrics = {
      budget: 90,
      timeline: 85,
      resources: 80,
      stakeholders: 95
    }
    
    const score = calculateHealthScore(metrics)
    // 90*0.3 + 85*0.3 + 80*0.2 + 95*0.2 = 27 + 25.5 + 16 + 19 = 87.5
    expect(score).toBeCloseTo(87.5, 1)
  })

  it('handles low scores appropriately', () => {
    const metrics = {
      budget: 50,
      timeline: 45,
      resources: 40,
      stakeholders: 55
    }
    
    const score = calculateHealthScore(metrics)
    expect(score).toBeLessThan(60)
  })
})

