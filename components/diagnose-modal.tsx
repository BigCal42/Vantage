'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, AlertTriangle, TrendingDown, Users, DollarSign, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

interface DiagnosisResult {
  title: string
  severity: 'critical' | 'high' | 'medium'
  description: string
  prediction: string
  recommendation: string
  confidence: number
  icon: React.ReactNode
}

const mockResults: DiagnosisResult[] = [
  {
    title: 'Silent Vendor Delay Pattern',
    severity: 'critical',
    description: 'Vendor delivery velocity declining from 6 days early (Phase 1) to 2 days early (Phase 2) to on-deadline (Phase 3).',
    prediction: 'Phase 4 will slip by 2-3 weeks. 87% probability based on velocity trend analysis.',
    recommendation: 'Escalate to vendor executive sponsor immediately. Request resource allocation review and establish weekly checkpoint calls.',
    confidence: 87,
    icon: <TrendingDown className="size-5" />
  },
  {
    title: 'Knowledge Silo Risk',
    severity: 'high',
    description: 'Architect Jamie is single point of failure on 14 critical tasks with no backup coverage.',
    prediction: 'If Jamie becomes unavailable, timeline extends 4-6 weeks minimum.',
    recommendation: 'Immediate knowledge transfer: Pair Jamie with 2 developers, document architecture decisions, record video walkthroughs.',
    confidence: 92,
    icon: <Users className="size-5" />
  },
  {
    title: 'Budget Trajectory Misalignment',
    severity: 'high',
    description: 'Spending velocity increased 18% in Phase 3 vs Phase 2. Simple work is complete; complex work ahead.',
    prediction: 'Projected $1.8M overrun by project completion. Budget exhaustion in Q3.',
    recommendation: 'Secure contingency approval now. Historical similar projects required 30-40% additional budget in equivalent phases.',
    confidence: 81,
    icon: <DollarSign className="size-5" />
  }
]

export function DiagnoseModal({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  const [diagnosing, setDiagnosing] = useState(false)
  const [complete, setComplete] = useState(false)

  const startDiagnosis = () => {
    setDiagnosing(true)
    setTimeout(() => {
      setDiagnosing(false)
      setComplete(true)
    }, 3000)
  }

  const severityColors = {
    critical: 'bg-destructive/10 text-destructive border-destructive/30',
    high: 'bg-warning/10 text-warning border-warning/30',
    medium: 'bg-primary/10 text-primary border-primary/30'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Zap className="size-7 text-warning" />
            Diagnose My Project
          </DialogTitle>
          <DialogDescription>
            AI-powered deep analysis to find hidden risks your dashboard doesn't show
          </DialogDescription>
        </DialogHeader>

        {!diagnosing && !complete && (
          <div className="py-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="size-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="size-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Deep Project Analysis</h3>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Vantage will analyze your project across 1,847 similar projects to detect 
                  patterns, risks, and opportunities invisible to traditional dashboards.
                </p>
              </div>
            </div>

            <Card className="p-6 bg-muted/30">
              <div className="space-y-3 text-sm">
                <div className="font-semibold">Analysis includes:</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" />
                    <span>Vendor velocity patterns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" />
                    <span>Resource allocation risks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" />
                    <span>Budget trajectory modeling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" />
                    <span>Stakeholder engagement levels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" />
                    <span>Knowledge concentration points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-success" />
                    <span>Timeline cascade effects</span>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              size="lg" 
              className="w-full gap-2"
              onClick={startDiagnosis}
            >
              <Sparkles className="size-5" />
              Start Deep Analysis
            </Button>
          </div>
        )}

        {diagnosing && (
          <div className="py-12 space-y-6">
            <div className="text-center space-y-4">
              <div className="size-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <Zap className="size-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Analyzing your project...</h3>
                <p className="text-muted-foreground">
                  Running pattern matching across 1,847 similar projects
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <AnalysisStep label="Analyzing timeline dependencies" status="complete" />
              <AnalysisStep label="Evaluating resource allocation" status="complete" />
              <AnalysisStep label="Checking stakeholder engagement" status="active" />
              <AnalysisStep label="Reviewing vendor performance" status="pending" />
              <AnalysisStep label="Modeling budget trajectories" status="pending" />
            </div>
          </div>
        )}

        {complete && (
          <div className="space-y-6">
            <Card className="p-6 bg-warning/5 border-warning/20">
              <div className="flex items-start gap-4">
                <AlertTriangle className="size-6 text-warning mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="font-semibold text-lg">
                    Found 3 hidden risks your dashboard doesn't show
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These patterns were detected by comparing your project to 1,847 similar transformations 
                    and identifying where you diverge from successful outcomes.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              {mockResults.map((result, i) => (
                <Card key={i} className="p-6 border-2 hover:shadow-lg transition-all">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg border ${severityColors[result.severity]}`}>
                          {result.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{result.title}</h4>
                            <Badge variant="outline" className={severityColors[result.severity]}>
                              {result.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {result.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="whitespace-nowrap">
                        {result.confidence}% confidence
                      </Badge>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Prediction
                        </div>
                        <p className="text-sm">{result.prediction}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Recommendation
                        </div>
                        <p className="text-sm">{result.recommendation}</p>
                      </div>
                    </div>

                    <Button size="sm" className="w-full gap-2">
                      Generate Mitigation Plan
                      <ArrowRight className="size-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Export Report
              </Button>
              <Button className="flex-1 gap-2">
                Create Action Items
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function AnalysisStep({ 
  label, 
  status 
}: { 
  label: string
  status: 'complete' | 'active' | 'pending'
}) {
  return (
    <div className="flex items-center gap-3">
      {status === 'complete' && (
        <CheckCircle2 className="size-5 text-success" />
      )}
      {status === 'active' && (
        <div className="size-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      )}
      {status === 'pending' && (
        <div className="size-5 rounded-full border-2 border-muted" />
      )}
      <span className={status === 'pending' ? 'text-muted-foreground' : ''}>{label}</span>
    </div>
  )
}
