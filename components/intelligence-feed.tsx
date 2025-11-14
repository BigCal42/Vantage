'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Brain, AlertTriangle, TrendingUp, Target, CheckCircle2, ArrowRight, Sparkles, Clock } from 'lucide-react'
import { useState } from 'react'

interface FeedItem {
  id: string
  type: 'decision' | 'insight' | 'risk' | 'event'
  priority: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  timestamp: string
  agent?: string
  actions?: { label: string; variant?: 'default' | 'outline' }[]
  impact?: string
}

const feedItems: FeedItem[] = [
  {
    id: '1',
    type: 'decision',
    priority: 'critical',
    title: 'Contractor Budget Approval Needed',
    description: 'Q3 resource gap requires 2 additional developers ($90K). Delaying decision will push Phase 3 timeline by 3 weeks.',
    timestamp: '2 hours ago',
    impact: 'High impact on timeline',
    actions: [
      { label: 'Approve $90K', variant: 'default' },
      { label: 'View Alternatives', variant: 'outline' }
    ]
  },
  {
    id: '2',
    type: 'insight',
    priority: 'high',
    title: 'Vendor Velocity Declining',
    description: 'AI detected a pattern: vendor delivery velocity dropped from 6 days early (Phase 1) to 2 days early (Phase 2). Predicting delays in Phase 4.',
    timestamp: '4 hours ago',
    agent: 'Risk Agent',
    actions: [
      { label: 'Schedule Vendor Call', variant: 'outline' }
    ]
  },
  {
    id: '3',
    type: 'risk',
    priority: 'high',
    title: 'Knowledge Silo Detected',
    description: 'Jamie (architect) is single point of failure on 14 critical tasks. Recommend immediate knowledge transfer.',
    timestamp: '6 hours ago',
    agent: 'Timeline Agent',
    actions: [
      { label: 'Create Transfer Plan', variant: 'outline' }
    ]
  },
  {
    id: '4',
    type: 'event',
    priority: 'medium',
    title: 'Phase 2 Milestone Completed',
    description: 'Integration layer successfully deployed. All acceptance criteria met, 2 days ahead of schedule.',
    timestamp: '1 day ago',
    actions: []
  },
  {
    id: '5',
    type: 'insight',
    priority: 'medium',
    title: 'Budget Trajectory Shift',
    description: 'Spending velocity increased 18% in Phase 3 vs Phase 2. Projected overrun: $1.8M by project completion.',
    timestamp: '1 day ago',
    agent: 'Financial Agent',
    actions: [
      { label: 'View Forecast', variant: 'outline' }
    ]
  }
]

export function IntelligenceFeed({ selectedIndex }: { selectedIndex?: number }) {
  const [filter, setFilter] = useState<'all' | 'decision' | 'insight' | 'risk'>('all')
  
  const filteredItems = filter === 'all' 
    ? feedItems 
    : feedItems.filter(item => item.type === filter)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Intelligence Feed</h2>
          <p className="text-sm text-muted-foreground">
            AI-powered insights prioritized by impact × urgency
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto">
          <Brain className="size-4" />
          Configure AI
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
        <FilterButton 
          label="All" 
          count={feedItems.length}
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        />
        <FilterButton 
          label="Decisions" 
          count={feedItems.filter(i => i.type === 'decision').length}
          active={filter === 'decision'}
          onClick={() => setFilter('decision')}
        />
        <FilterButton 
          label="Insights" 
          count={feedItems.filter(i => i.type === 'insight').length}
          active={filter === 'insight'}
          onClick={() => setFilter('insight')}
        />
        <FilterButton 
          label="Risks" 
          count={feedItems.filter(i => i.type === 'risk').length}
          active={filter === 'risk'}
          onClick={() => setFilter('risk')}
        />
      </div>

      <div className="space-y-3 sm:space-y-4">
        {filteredItems.map((item, index) => (
          <FeedCard 
            key={item.id} 
            item={item} 
            index={index}
            isSelected={selectedIndex === index}
          />
        ))}
      </div>

      <div className="flex justify-center pt-4 sm:pt-6">
        <Button variant="ghost" className="gap-2 group">
          Load More Insights
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}

function FilterButton({ 
  label, 
  count, 
  active, 
  onClick 
}: { 
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <Button
      variant={active ? 'default' : 'outline'}
      size="sm"
      className="gap-2 shrink-0 h-9"
      onClick={onClick}
    >
      <span className="font-medium">{label}</span>
      <Badge variant={active ? 'secondary' : 'outline'} className="h-5 px-1.5 font-semibold tabular-nums">
        {count}
      </Badge>
    </Button>
  )
}

function FeedCard({ item, index, isSelected }: { item: FeedItem; index: number; isSelected?: boolean }) {
  const [dismissed, setDismissed] = useState(false)
  
  const typeConfig = {
    decision: {
      icon: Target,
      color: 'bg-warning/10 text-warning border-warning/30',
      bgColor: 'bg-warning/5'
    },
    insight: {
      icon: Brain,
      color: 'bg-primary/10 text-primary border-primary/30',
      bgColor: 'bg-primary/5'
    },
    risk: {
      icon: AlertTriangle,
      color: 'bg-destructive/10 text-destructive border-destructive/30',
      bgColor: 'bg-destructive/5'
    },
    event: {
      icon: CheckCircle2,
      color: 'bg-success/10 text-success border-success/30',
      bgColor: 'bg-success/5'
    }
  }

  const priorityConfig = {
    critical: 'bg-destructive/10 text-destructive border-destructive/30',
    high: 'bg-warning/10 text-warning border-warning/30',
    medium: 'bg-primary/10 text-primary border-primary/30',
    low: 'bg-muted text-muted-foreground border-border'
  }

  const config = typeConfig[item.type]
  const Icon = config.icon

  if (dismissed) return null

  return (
    <Card 
      className={`border-2 transition-all duration-200 hover:shadow-xl ${config.bgColor} hover:-translate-y-1 focus-within:ring-2 focus-within:ring-primary/20 ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      style={{ 
        animation: `slide-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.06}s both` 
      }}
    >
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
            <div className={`rounded-lg p-2 sm:p-2.5 border-2 shrink-0 ${config.color}`}>
              <Icon className="size-4 sm:size-5" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-start gap-2 flex-wrap">
                <h3 className="font-semibold text-base sm:text-lg leading-tight">{item.title}</h3>
                {item.priority !== 'low' && (
                  <Badge variant="outline" className={`${priorityConfig[item.priority]} shrink-0 font-semibold`}>
                    {item.priority}
                  </Badge>
                )}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
                {item.description}
              </p>
              {item.impact && (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                  <Sparkles className="size-3 sm:size-4 text-warning" />
                  <span className="text-warning">{item.impact}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span className="whitespace-nowrap tabular-nums">{item.timestamp}</span>
            </div>
            {item.agent && (
              <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border/50 text-[10px] sm:text-xs font-medium">
                {item.agent}
              </Badge>
            )}
          </div>
        </div>

        {item.actions && item.actions.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 border-t border-border/50">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              {item.actions.map((action, i) => (
                <Button 
                  key={i}
                  size="sm" 
                  variant={action.variant || 'default'}
                  className="gap-2 w-full sm:w-auto"
                >
                  {action.label}
                  <ArrowRight className="size-3" />
                </Button>
              ))}
            </div>
            <Button 
              size="sm" 
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={() => setDismissed(true)}
            >
              Dismiss
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
