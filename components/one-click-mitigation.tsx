'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, CheckCircle2, Clock, DollarSign, Users, TrendingUp, Sparkles } from 'lucide-react'

interface MitigationOption {
  id: string
  title: string
  description: string
  impact: string
  cost: string
  timeToImplement: string
  successRate: number
  recommended: boolean
}

export function OneClickMitigation({ riskTitle }: { riskTitle: string }) {
  const [executing, setExecuting] = useState<string | null>(null)
  const [executed, setExecuted] = useState<string | null>(null)

  const options: MitigationOption[] = [
    {
      id: '1',
      title: 'Hire 2 Contract Developers',
      description: 'Accelerate Phase 3 development and reduce resource pressure',
      impact: 'Timeline: -3 weeks',
      cost: '$180K',
      timeToImplement: '2 weeks',
      successRate: 87,
      recommended: true
    },
    {
      id: '2',
      title: 'Negotiate Vendor Extension',
      description: 'Extend vendor delivery timeline by 4 weeks with penalty waiver',
      impact: 'Budget: -$45K',
      cost: '$0',
      timeToImplement: '1 week',
      successRate: 65,
      recommended: false
    },
    {
      id: '3',
      title: 'Reduce Scope (Phase 4)',
      description: 'Move non-critical features to Phase 5, maintain timeline',
      impact: 'Scope: -15%',
      cost: '$0',
      timeToImplement: 'Immediate',
      successRate: 92,
      recommended: false
    }
  ]

  const handleExecute = async (optionId: string) => {
    setExecuting(optionId)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setExecuting(null)
    setExecuted(optionId)
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Zap className="size-5 text-warning" />
          <h3 className="text-lg font-semibold">Mitigation Options</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          For: <span className="font-medium text-foreground">{riskTitle}</span>
        </p>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <Card 
            key={option.id}
            className={`p-4 transition-all duration-300 ${
              option.recommended 
                ? 'border-primary/50 bg-primary/5 shadow-md' 
                : 'border-border hover:border-primary/30'
            } ${
              executed === option.id ? 'border-success/50 bg-success/5' : ''
            }`}
          >
            <div className="space-y-3">
              {/* Option header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{option.title}</h4>
                    {option.recommended && (
                      <Badge className="bg-primary text-primary-foreground gap-1">
                        <Sparkles className="size-3" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${
                    option.successRate >= 80 
                      ? 'bg-success/10 text-success border-success/30'
                      : 'bg-warning/10 text-warning border-warning/30'
                  }`}
                >
                  {option.successRate}% success
                </Badge>
              </div>

              {/* Option details */}
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="size-4" />
                  <span>{option.impact}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="size-4" />
                  <span>{option.cost}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4" />
                  <span>{option.timeToImplement}</span>
                </div>
              </div>

              {/* Action button */}
              <Button
                size="sm"
                className="w-full gap-2"
                variant={option.recommended ? 'default' : 'outline'}
                disabled={executing !== null || executed === option.id}
                onClick={() => handleExecute(option.id)}
              >
                {executing === option.id ? (
                  <>
                    <div className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Executing...
                  </>
                ) : executed === option.id ? (
                  <>
                    <CheckCircle2 className="size-4" />
                    Executed
                  </>
                ) : (
                  <>
                    <Zap className="size-4" />
                    Execute Now
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {executed && (
        <div className="p-4 rounded-lg bg-success/10 border border-success/30 space-y-2 animate-slide-in">
          <div className="flex items-center gap-2 text-success font-semibold">
            <CheckCircle2 className="size-5" />
            <span>Mitigation Plan Activated</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Automated actions: Contractor req posted, budget approval requested, timeline updated, stakeholders notified.
          </p>
        </div>
      )}
    </Card>
  )
}
