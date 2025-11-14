'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, Shield, Clock, Users, TrendingUp, MessageSquare } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'

interface AgentMessage {
  agent: string
  role: string
  icon: React.ReactNode
  color: string
  message: string
  confidence: number
}

const discussion: AgentMessage[] = [
  {
    agent: 'Risk Agent',
    role: 'Cassandra',
    icon: <Shield className="size-4" />,
    color: 'text-destructive',
    message: 'High risk - Phase 2 stability concerns. 8 unresolved defects could cascade into Phase 3.',
    confidence: 87
  },
  {
    agent: 'Timeline Agent',
    role: 'Chronos',
    icon: <Clock className="size-4" />,
    color: 'text-primary',
    message: 'We need to start Phase 3 next week to maintain critical path. We have 2 weeks of buffer.',
    confidence: 92
  },
  {
    agent: 'Readiness Agent',
    role: 'Catalyst',
    icon: <Users className="size-4" />,
    color: 'text-warning',
    message: 'Team is at 94% capacity. Starting Phase 3 early risks quality and burnout.',
    confidence: 78
  },
  {
    agent: 'Scenario Agent',
    role: 'Oracle',
    icon: <TrendingUp className="size-4" />,
    color: 'text-chart-2',
    message: 'If we delay 2 weeks: Baseline scenario drops to 38% likely, Conservative rises to 35%.',
    confidence: 81
  }
]

export function AgentDiscussionPanel() {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            Agent Discussion
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Live
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          AI agents analyzing Phase 3 start date decision
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {discussion.map((msg, i) => (
          <div 
            key={i}
            className="flex gap-3 p-4 rounded-lg bg-card/50 border border-border/40
                       hover:bg-accent/20 transition-colors"
          >
            <Avatar className={`size-10 rounded-lg bg-muted flex items-center justify-center ${msg.color}`}>
              {msg.icon}
            </Avatar>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{msg.agent}</span>
                <span className="text-xs text-muted-foreground">({msg.role})</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {msg.confidence}% confidence
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {msg.message}
              </p>
            </div>
          </div>
        ))}

        {/* Synthesis */}
        <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <Brain className="size-5 text-primary mt-0.5" />
            <div className="flex-1 space-y-1">
              <div className="font-semibold text-sm">Synthesized Recommendation</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Delay Phase 3 by 1 week. Use time for defect resolution + team recovery. 
                Communicate as "quality gate" to stakeholders.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
