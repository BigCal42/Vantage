'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, TrendingUp, AlertCircle } from 'lucide-react'

interface TimelineScenario {
  label: string
  probability: number
  date: string
  color: string
  status: 'likely' | 'possible' | 'unlikely'
}

export function PredictiveTimeline() {
  const scenarios: TimelineScenario[] = [
    {
      label: 'Optimistic',
      probability: 18,
      date: 'Sept 2025',
      color: 'bg-success',
      status: 'unlikely'
    },
    {
      label: 'Baseline',
      probability: 73,
      date: 'Oct 2025',
      color: 'bg-primary',
      status: 'likely'
    },
    {
      label: 'Conservative',
      probability: 9,
      date: 'Nov 2025',
      color: 'bg-warning',
      status: 'unlikely'
    }
  ]

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">Predictive Timeline</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Probability distribution for go-live date
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
          73% confidence
        </Badge>
      </div>

      <div className="space-y-3">
        {scenarios.map((scenario) => (
          <div key={scenario.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{scenario.label}</span>
                <span className="text-muted-foreground">{scenario.date}</span>
              </div>
              <span className="font-semibold tabular-nums">{scenario.probability}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${scenario.color} transition-all duration-1000 ease-out`}
                style={{ width: `${scenario.probability}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t space-y-3">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Key Timeline Factors
        </div>
        <div className="space-y-2">
          <FactorItem
            label="Vendor delivery velocity"
            impact="High"
            trend="declining"
          />
          <FactorItem
            label="Resource availability Q3"
            impact="Medium"
            trend="stable"
          />
          <FactorItem
            label="Testing phase complexity"
            impact="Medium"
            trend="increasing"
          />
        </div>
      </div>
    </Card>
  )
}

function FactorItem({ 
  label, 
  impact, 
  trend 
}: { 
  label: string
  impact: string
  trend: string
}) {
  const getTrendColor = () => {
    if (trend === 'declining' || trend === 'increasing') return 'text-warning'
    return 'text-success'
  }

  return (
    <div className="flex items-center justify-between text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {impact} impact
        </Badge>
        <span className={`text-xs font-medium ${getTrendColor()}`}>
          {trend}
        </span>
      </div>
    </div>
  )
}
