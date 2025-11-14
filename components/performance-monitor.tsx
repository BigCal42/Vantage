'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Zap } from 'lucide-react'

export function PerformanceMonitor() {
  const [fps, setFps] = useState(60)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const measureFps = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime >= lastTime + 1000) {
        setFps(frameCount)
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measureFps)
    }

    const rafId = requestAnimationFrame(measureFps)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Only show if performance is degraded
  if (fps >= 55) return null

  return (
    <Badge 
      variant="outline" 
      className="fixed bottom-4 right-4 z-50 gap-1.5 bg-warning/10 text-warning border-warning/30"
    >
      <Zap className="size-3" />
      <span className="text-xs">{fps} FPS</span>
    </Badge>
  )
}
