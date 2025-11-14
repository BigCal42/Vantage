'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, TrendingUp, X, ChevronDown, Zap, Target, AlertCircle } from 'lucide-react'
import { RealTimeIndicator } from './real-time-indicator'

export function FloatingContextPill() {
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      setVisible(currentScroll < 100 || currentScroll < lastScroll)
      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed top-4 right-4 z-40 animate-slide-in">
      <Card className={`border-2 shadow-xl transition-all duration-300 ${
        expanded ? 'w-80' : 'w-auto'
      }`}>
        <div className="p-3">
          {/* Compact View */}
          {!expanded && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-success animate-pulse-glow" />
                <span className="font-semibold text-sm">Mercy Valley Health</span>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                87%
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="size-7 p-0"
                onClick={() => setExpanded(true)}
              >
                <ChevronDown className="size-4" />
              </Button>
            </div>
          )}

          {/* Expanded View */}
          {expanded && (
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-success animate-pulse-glow" />
                    <h3 className="font-semibold">Mercy Valley Health</h3>
                  </div>
                  <RealTimeIndicator />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-7 p-0"
                  onClick={() => setExpanded(false)}
                >
                  <X className="size-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Health</div>
                  <div className="flex items-center gap-1.5">
                    <div className="text-2xl font-bold">87</div>
                    <TrendingUp className="size-4 text-success" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Risk Score</div>
                  <div className="flex items-center gap-1.5">
                    <div className="text-2xl font-bold">67</div>
                    <AlertTriangle className="size-4 text-warning" />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border/50 space-y-2">
                <div className="text-xs text-muted-foreground">Next Actions</div>
                <div className="space-y-1.5">
                  <ActionItem 
                    label="Approve contractor budget" 
                    priority="critical"
                  />
                  <ActionItem 
                    label="Schedule vendor call" 
                    priority="high"
                  />
                </div>
              </div>

              <Button size="sm" className="w-full gap-2" variant="outline">
                <Zap className="size-3" />
                Diagnose Now
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function ActionItem({ label, priority }: { label: string; priority: 'critical' | 'high' }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div className={`size-1.5 rounded-full ${
        priority === 'critical' ? 'bg-destructive' : 'bg-warning'
      }`} />
      <span className="truncate">{label}</span>
    </div>
  )
}
