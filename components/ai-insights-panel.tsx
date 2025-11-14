'use client'

import { Sparkles, TrendingDown, Users, AlertTriangle, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function AIInsightsPanel() {
  const insights = [
    {
      icon: TrendingDown,
      title: 'Vendor Velocity Declining',
      description: 'Phase 4 likely to slip by 2-3 weeks based on delivery trend analysis.',
      severity: 'high',
      confidence: 94
    },
    {
      icon: Users,
      title: 'Knowledge Silo Detected',
      description: 'Jamie is essential to 14 of 23 remaining tasks. Single point of failure risk.',
      severity: 'high',
      confidence: 89
    },
    {
      icon: AlertTriangle,
      title: 'Phase 2 Buffer Depleting',
      description: '4 days behind with 2 weeks buffer. Go-live date at risk if Phase 3 starts late.',
      severity: 'medium',
      confidence: 82
    }
  ]

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/[0.02]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2.5 text-xl">
            <div className="rounded-lg bg-primary/10 p-1.5">
              <Sparkles className="size-5 text-primary" />
            </div>
            AI Insights
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-semibold">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-5">
          <p className="text-sm leading-relaxed">
            Your project is <span className="font-bold text-primary">40% ready</span>. 
            Critical gaps in governance roles. Recommend hiring contractors for Q3 
            or expect 6-week go-live delay.
          </p>
        </div>

        <div className="space-y-2.5">
          {insights.map((insight, i) => {
            const Icon = insight.icon
            const severityConfig = 
              insight.severity === 'high' 
                ? { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/20' }
                : insight.severity === 'medium'
                ? { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' }
                : { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' }

            return (
              <button
                key={i}
                className="group w-full rounded-xl border bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-lg p-2 ${severityConfig.bg} ${severityConfig.text}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm leading-tight">{insight.title}</h4>
                      <Badge variant="outline" className={`${severityConfig.border} ${severityConfig.text} text-xs shrink-0`}>
                        {insight.confidence}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {insight.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-medium text-primary pt-1">
                      View Details
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
          View All Insights
        </Button>
      </CardContent>
    </Card>
  )
}
