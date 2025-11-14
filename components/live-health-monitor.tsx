'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock, DollarSign, Users, Zap, Activity } from 'lucide-react'

interface HealthMetric {
  label: string
  value: number
  trend: 'up' | 'down' | 'stable'
  status: 'good' | 'warning' | 'critical'
  changePercent: number
}

export function LiveHealthMonitor() {
  const [healthScore, setHealthScore] = useState(87)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [scanning, setScanning] = useState(false)

  // Simulate continuous monitoring with micro-updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small fluctuations in health score
      setHealthScore(prev => {
        const change = (Math.random() - 0.5) * 2
        const newScore = Math.max(0, Math.min(100, prev + change))
        return Math.round(newScore * 10) / 10 // More precise scoring
      })
      setLastUpdate(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Periodic "scanning" animation
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanning(true)
      setTimeout(() => setScanning(false), 2000)
    }, 60000)

    setScanning(true)
    setTimeout(() => setScanning(false), 2000)

    return () => clearInterval(scanInterval)
  }, [])

  const metrics: HealthMetric[] = [
    {
      label: 'Timeline',
      value: 92,
      trend: 'up',
      status: 'good',
      changePercent: 3
    },
    {
      label: 'Budget',
      value: 78,
      trend: 'down',
      status: 'warning',
      changePercent: -5
    },
    {
      label: 'Resources',
      value: 85,
      trend: 'stable',
      status: 'good',
      changePercent: 0
    },
    {
      label: 'Risk',
      value: 67,
      trend: 'up',
      status: 'warning',
      changePercent: 8
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-success'
      case 'warning': return 'text-warning'
      case 'critical': return 'text-destructive'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'good': return 'bg-success/10 border-success/30'
      case 'warning': return 'bg-warning/10 border-warning/30'
      case 'critical': return 'bg-destructive/10 border-destructive/30'
      default: return 'bg-muted'
    }
  }

  return (
    <Card className="border-2 shadow-xl overflow-hidden relative">
      {scanning && (
        <div className="absolute inset-0 bg-primary/5 animate-pulse-glow pointer-events-none z-10" 
             role="status" 
             aria-label="Scanning project health" />
      )}

      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Activity className="size-5 text-primary" />
              <h3 className="text-lg font-semibold">Live Health Monitor</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="size-1.5 rounded-full bg-success animate-pulse-glow" />
              <span>Live • Updated {Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}s ago</span>
            </div>
          </div>
          <Badge variant="outline" className={`${getStatusBg(healthScore >= 80 ? 'good' : healthScore >= 60 ? 'warning' : 'critical')} text-lg font-bold px-3 py-1`}>
            {healthScore}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <Card key={metric.label} className={`p-4 border ${getStatusBg(metric.status)} transition-all duration-300`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
                  {metric.trend === 'up' && <TrendingUp className={`size-4 ${getStatusColor(metric.status)}`} />}
                  {metric.trend === 'down' && <TrendingDown className={`size-4 ${getStatusColor(metric.status)}`} />}
                  {metric.trend === 'stable' && <CheckCircle2 className={`size-4 ${getStatusColor(metric.status)}`} />}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold tabular-nums ${getStatusColor(metric.status)}`}>
                    {metric.value}
                  </span>
                  {metric.changePercent !== 0 && (
                    <span className={`text-xs font-medium ${metric.changePercent > 0 ? 'text-success' : 'text-destructive'}`}>
                      {metric.changePercent > 0 ? '+' : ''}{metric.changePercent}%
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Active Insights
          </div>
          <div className="space-y-2">
            <InsightCard
              icon={<AlertTriangle className="size-4" />}
              text="Budget velocity increased 15% last week - contingency buffer at risk"
              severity="warning"
              timeAgo="2m ago"
            />
            <InsightCard
              icon={<Users className="size-4" />}
              text="Developer capacity at 94% - resource gap forming in Q3"
              severity="warning"
              timeAgo="8m ago"
            />
            <InsightCard
              icon={<Clock className="size-4" />}
              text="Vendor delivery velocity declining - Phase 4 timeline at risk"
              severity="critical"
              timeAgo="15m ago"
            />
          </div>
        </div>

        <Button className="w-full gap-2 group" size="lg">
          <Zap className="size-4 transition-transform group-hover:rotate-12" />
          Deep Scan Now
          <span className="text-xs opacity-70">(⌘⇧D)</span>
        </Button>
      </div>
    </Card>
  )
}

function InsightCard({ 
  icon, 
  text, 
  severity, 
  timeAgo 
}: { 
  icon: React.ReactNode
  text: string
  severity: 'good' | 'warning' | 'critical'
  timeAgo: string
}) {
  const getSeverityStyles = () => {
    switch (severity) {
      case 'critical':
        return 'border-destructive/30 bg-destructive/5 hover:bg-destructive/10'
      case 'warning':
        return 'border-warning/30 bg-warning/5 hover:bg-warning/10'
      default:
        return 'border-success/30 bg-success/5 hover:bg-success/10'
    }
  }

  const getSeverityIconColor = () => {
    switch (severity) {
      case 'critical': return 'text-destructive'
      case 'warning': return 'text-warning'
      default: return 'text-success'
    }
  }

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${getSeverityStyles()}`}>
      <div className={`mt-0.5 ${getSeverityIconColor()}`}>
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm leading-tight">{text}</p>
        <span className="text-xs text-muted-foreground">{timeAgo}</span>
      </div>
    </div>
  )
}
