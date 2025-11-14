'use client'

import { useState } from 'react'
import { ContextBar } from '@/components/context-bar'
import { MainNavigation } from '@/components/main-navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Stethoscope, Sparkles, AlertTriangle, TrendingDown, Users, DollarSign, ArrowRight } from 'lucide-react'

export default function DiagnosePage() {
  const [diagnosing, setDiagnosing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleDiagnose = () => {
    setDiagnosing(true)
    setTimeout(() => {
      setDiagnosing(false)
      setShowResults(true)
    }, 3000)
  }

  const risks = [
    {
      icon: TrendingDown,
      title: 'Silent Vendor Delay',
      severity: 'high',
      confidence: 94,
      description: 'Vendor tracking to milestones but delivery velocity declining. Phase 1: 6 days early. Phase 2: 2 days early. Phase 3: On deadline. Prediction: Phase 4 will slip 2-3 weeks.',
      actions: ['Escalate to vendor executive sponsor', 'Request detailed Phase 4 plan', 'Establish weekly checkpoints']
    },
    {
      icon: Users,
      title: 'Knowledge Silo Risk',
      severity: 'high',
      confidence: 89,
      description: 'Jamie is essential to 14 of 23 remaining tasks. Single point of failure if she leaves or becomes unavailable.',
      actions: ['Immediate knowledge transfer sessions', 'Pair with 2 developers', 'Document architecture decisions', 'Record video walkthrough']
    },
    {
      icon: DollarSign,
      title: 'Budget Mirage',
      severity: 'medium',
      confidence: 82,
      description: '44% through timeline, 38% through budget looks healthy. However, Phases 1-2 were under-budget (simple work). Phase 3 complexity not accounted for. Prediction: Need $1.8M more.',
      actions: ['Secure contingency approval now', 'Detailed Phase 3-5 cost breakdown', 'Identify cost reduction opportunities']
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <ContextBar />
      <MainNavigation />
      
      <main className="ml-64 p-8">
        <div className="mx-auto max-w-[1600px] space-y-8">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">Diagnose Project</h1>
            <p className="text-lg text-muted-foreground">
              AI-powered deep analysis to uncover hidden risks
            </p>
          </div>

          {!showResults ? (
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/[0.02]">
              <CardContent className="p-12 text-center space-y-8">
                <div className="inline-flex rounded-full bg-primary/10 p-6">
                  <Stethoscope className="size-16 text-primary" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Ready to diagnose your project?</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Our AI will analyze your project patterns against 1,847 similar transformations 
                    and identify risks your dashboard doesn't show.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="gap-2 h-14 px-8 text-base"
                  onClick={handleDiagnose}
                  disabled={diagnosing}
                >
                  {diagnosing ? (
                    <>
                      <Sparkles className="size-5 animate-spin" />
                      Analyzing Project...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-5" />
                      Run Diagnosis
                    </>
                  )}
                </Button>
                {diagnosing && (
                  <div className="space-y-3 pt-4">
                    <div className="h-2 w-full max-w-md mx-auto bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary animate-pulse" style={{ width: '60%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Analyzing timeline dependencies... Evaluating resource allocation... Checking vendor performance...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="size-6 text-destructive shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">3 Hidden Risks Detected</h3>
                      <p className="text-sm text-muted-foreground">
                        These risks aren't visible in your dashboard but could cause project failure. 
                        Immediate action recommended.
                      </p>
                    </div>
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      High Priority
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {risks.map((risk, i) => {
                  const Icon = risk.icon
                  const severityConfig = 
                    risk.severity === 'high' 
                      ? { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/20' }
                      : { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' }

                  return (
                    <Card key={i} className={cn("border-2", severityConfig.border)}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className={cn("rounded-lg p-3", severityConfig.bg, severityConfig.text)}>
                              <Icon className="size-6" />
                            </div>
                            <div>
                              <CardTitle className="text-2xl mb-2">{risk.title}</CardTitle>
                              <div className="flex items-center gap-3">
                                <Badge variant="outline" className={cn(severityConfig.border, severityConfig.text)}>
                                  {risk.severity === 'high' ? 'High Severity' : 'Medium Severity'}
                                </Badge>
                                <Badge variant="secondary">
                                  {risk.confidence}% Confidence
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold">Analysis</h4>
                          <p className="text-muted-foreground leading-relaxed">{risk.description}</p>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold">Recommended Actions</h4>
                          <ul className="space-y-2">
                            {risk.actions.map((action, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <ArrowRight className="size-4 text-primary shrink-0 mt-1" />
                                <span className="text-sm text-muted-foreground">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button className="w-full">
                          Generate Mitigation Plan
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">Want the full report?</h3>
                      <p className="text-sm text-muted-foreground">
                        Download comprehensive analysis with mitigation templates
                      </p>
                    </div>
                    <Button className="gap-2">
                      <Sparkles className="size-4" />
                      Export Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
