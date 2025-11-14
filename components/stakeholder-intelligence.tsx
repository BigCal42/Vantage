'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, TrendingDown, Mail, MessageSquare, Calendar, ArrowRight } from 'lucide-react'

interface Stakeholder {
  id: string
  name: string
  role: string
  engagement_score: number
  engagement_trend: 'up' | 'down' | 'stable'
  last_interaction: string
  sentiment: 'positive' | 'neutral' | 'negative'
  concern_areas: string[]
}

const stakeholders: Stakeholder[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Executive Sponsor (CFO)',
    engagement_score: 42,
    engagement_trend: 'down',
    last_interaction: '12 days ago',
    sentiment: 'neutral',
    concern_areas: ['Budget overruns', 'ROI timeline']
  },
  {
    id: '2',
    name: 'David Martinez',
    role: 'CIO',
    engagement_score: 88,
    engagement_trend: 'up',
    last_interaction: '2 hours ago',
    sentiment: 'positive',
    concern_areas: ['Technical architecture']
  },
  {
    id: '3',
    name: 'Jennifer Wu',
    role: 'CEO',
    engagement_score: 65,
    engagement_trend: 'stable',
    last_interaction: '3 days ago',
    sentiment: 'neutral',
    concern_areas: ['Timeline', 'Vendor relations']
  }
]

export function StakeholderIntelligence() {
  return (
    <Card className="p-6 border-2 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">Stakeholder Intelligence</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Engagement tracking and sentiment analysis
          </p>
        </div>
        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
          1 at risk
        </Badge>
      </div>

      <div className="space-y-3">
        {stakeholders.map((stakeholder) => (
          <div
            key={stakeholder.id}
            className="p-4 rounded-lg border-2 bg-card hover:bg-accent/5 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold">{stakeholder.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {stakeholder.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  <span>Last: {stakeholder.last_interaction}</span>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center gap-1">
                  {stakeholder.engagement_trend === 'down' && (
                    <TrendingDown className="size-4 text-destructive" />
                  )}
                  {stakeholder.engagement_trend === 'up' && (
                    <TrendingUp className="size-4 text-success" />
                  )}
                  <span className={`text-2xl font-bold tabular-nums ${
                    stakeholder.engagement_score < 50 ? 'text-destructive' : 
                    stakeholder.engagement_score > 75 ? 'text-success' : 
                    'text-warning'
                  }`}>
                    {stakeholder.engagement_score}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">engagement</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground">Key Concerns</div>
              <div className="flex flex-wrap gap-1.5">
                {stakeholder.concern_areas.map((concern, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {concern}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border/50 flex gap-2">
              <Button size="sm" variant="outline" className="gap-1.5 flex-1">
                <Mail className="size-3" />
                Send Brief
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5 flex-1">
                <MessageSquare className="size-3" />
                Schedule 1:1
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="ghost" size="sm" className="w-full gap-2">
        View All Stakeholders
        <ArrowRight className="size-3" />
      </Button>
    </Card>
  )
}
