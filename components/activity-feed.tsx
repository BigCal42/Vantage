'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertTriangle, UserPlus, FileText, TrendingUp, Clock } from 'lucide-react'

export function ActivityFeed() {
  const activities = [
    {
      icon: AlertTriangle,
      title: 'Q3 Developer shortage detected',
      description: 'Recommend hiring now or delay by 6 weeks',
      time: '2m ago',
      severity: 'warning'
    },
    {
      icon: CheckCircle2,
      title: 'Executive Sponsor assigned',
      description: 'Sarah Chen confirmed',
      time: '15m ago',
      severity: 'success'
    },
    {
      icon: TrendingUp,
      title: 'Baseline scenario updated',
      description: 'Timeline extended by 2 weeks',
      time: '1h ago',
      severity: 'info'
    },
    {
      icon: UserPlus,
      title: 'New resource allocated',
      description: 'Alex Martinez joined as Tech Lead',
      time: '3h ago',
      severity: 'success'
    },
    {
      icon: FileText,
      title: 'Risk assessment completed',
      description: 'Overall risk score: 67 (Medium)',
      time: '5h ago',
      severity: 'info'
    }
  ]

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2.5 text-xl">
            <div className="rounded-lg bg-muted p-1.5">
              <Clock className="size-5 text-muted-foreground" />
            </div>
            Activity Feed
          </CardTitle>
          <Badge variant="secondary" className="bg-success/10 text-success border-0 animate-pulse">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {activities.map((activity, i) => {
          const Icon = activity.icon
          const iconConfig = 
            activity.severity === 'warning' 
              ? { bg: 'bg-warning/10', text: 'text-warning' }
              : activity.severity === 'success' 
              ? { bg: 'bg-success/10', text: 'text-success' }
              : { bg: 'bg-primary/10', text: 'text-primary' }

          return (
            <div 
              key={i}
              className="group flex items-start gap-3 rounded-lg border bg-card/50 p-3.5 transition-all hover:border-primary/40 hover:bg-card"
            >
              <div className={`mt-0.5 rounded-lg p-1.5 ${iconConfig.bg} ${iconConfig.text}`}>
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-medium leading-tight">{activity.title}</h4>
                  <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
                    {activity.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          )
        })}

        <Button variant="ghost" className="w-full mt-2 text-muted-foreground hover:text-foreground">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  )
}
