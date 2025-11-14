'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals'

function sendToAnalytics(metric: Metric) {
  // Send to Vercel Analytics
  if (typeof window !== 'undefined' && (window as unknown as { va?: { track: (name: string, props: Record<string, unknown>) => void } }).va) {
    const va = (window as unknown as { va: { track: (name: string, props: Record<string, unknown>) => void } }).va
    va.track('web_vital', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      rating: metric.rating,
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vital]', metric.name, metric.value, metric.rating)
  }
}

export function WebVitals() {
  useEffect(() => {
    onCLS(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
    onINP(sendToAnalytics)
  }, [])

  return null
}

