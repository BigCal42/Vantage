'use client'

import { ContextBar } from '@/components/context-bar'
import { MainNavigation } from '@/components/main-navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, TrendingUp, TrendingDown, Clock, DollarSign, Download } from 'lucide-react'

export default function PMOPage() {
  return (
    <div className="min-h-screen bg-background">
      <ContextBar />
      <MainNavigation />
      
      <main className="ml-64 p-8">
        <div className="mx-auto max-w-[1600px] space-y-8">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-bold tracking-tight">PMO Dashboard</h1>
              <p className="text-lg text-muted-foreground">
                Executive briefing and governance overview
              </p>
            </div>
            <Button className="gap-2">
              <Download className="size-4" />
              Download Board Deck
            </Button>
          </div>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/[0.02]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                <CardTitle>Executive Summary</CardTitle>
                <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary">
                  AI Generated
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-muted-foreground">
                Mercy Valley Health EHR transformation is tracking at <span className="font-semibold text-foreground">87% readiness</span> with 
                strong momentum across active phases. Key risks include Q3 developer capacity constraints and vendor delivery 
                velocity decline. Recommend securing contractor resources immediately to maintain timeline integrity and 
                prevent go-live delay. Budget remains within tolerance at 88% utilization.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Budget Status', value: '+$2M', subtext: 'Over Budget', icon: DollarSign, trend: 'warning' },
              { label: 'Timeline', value: 'On Track', subtext: '18 months', icon: Clock, trend: 'success' },
              { label: 'Risk Score', value: '67', subtext: 'Medium', icon: TrendingUp, trend: 'warning' },
              { label: 'Readiness', value: '87%', subtext: 'Strong', icon: TrendingDown, trend: 'success' }
            ].map((metric, i) => {
              const Icon = metric.icon
              return (
                <Card key={i} className="border-border/40">
                  <CardContent className="p-6 space-y-4">
                    <div className={cn(
                      "inline-flex rounded-lg p-2",
                      metric.trend === 'success' && "bg-success/10 text-success",
                      metric.trend === 'warning' && "bg-warning/10 text-warning"
                    )}>
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold">{metric.value}</div>
                      <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
                      <div className="text-xs text-muted-foreground">{metric.subtext}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>RACI Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 font-semibold">Activity</th>
                      <th className="text-left py-4 px-4 font-semibold">Responsible</th>
                      <th className="text-left py-4 px-4 font-semibold">Accountable</th>
                      <th className="text-left py-4 px-4 font-semibold">Consulted</th>
                      <th className="text-left py-4 px-4 font-semibold">Informed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { activity: 'System Design', r: 'Tech Lead', a: 'CIO', c: 'Architects', i: 'PMO' },
                      { activity: 'Budget Approval', r: 'CFO', a: 'CEO', c: 'Finance', i: 'All' },
                      { activity: 'Training', r: 'Change Mgr', a: 'PMO', c: 'Dept Heads', i: 'Staff' }
                    ].map((row, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="py-4 px-4 font-medium">{row.activity}</td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            {row.r}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="bg-success/10 text-success">
                            {row.a}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{row.c}</td>
                        <td className="py-4 px-4 text-muted-foreground">{row.i}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
