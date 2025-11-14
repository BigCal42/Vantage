'use client'

import { useState } from 'react'
import { ContextBar } from '@/components/context-bar'
import { MainNavigation } from '@/components/main-navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Calendar, AlertTriangle } from 'lucide-react'

export default function ScenariosPage() {
  const [activeScenario, setActiveScenario] = useState('baseline')

  const scenarios = [
    { 
      id: 'baseline', 
      label: 'Baseline',
      timeline: '18 months',
      budget: '$12M',
      risk: 'Medium',
      probability: '45%'
    },
    { 
      id: 'accelerated', 
      label: 'Accelerated',
      timeline: '14 months', 
      budget: '$15M',
      risk: 'High',
      probability: '22%'
    },
    { 
      id: 'conservative', 
      label: 'Conservative',
      timeline: '24 months',
      budget: '$11M',
      risk: 'Low',
      probability: '28%'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <ContextBar />
      <MainNavigation />
      
      <main className="ml-64 p-8">
        <div className="mx-auto max-w-[1600px] space-y-8">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">Scenario Modeling</h1>
            <p className="text-lg text-muted-foreground">
              Compare different execution strategies and their outcomes
            </p>
          </div>

          <div className="flex gap-3">
            {scenarios.map((scenario) => (
              <Button
                key={scenario.id}
                variant={activeScenario === scenario.id ? 'default' : 'outline'}
                onClick={() => setActiveScenario(scenario.id)}
                className="gap-2"
              >
                {scenario.label}
                <Badge variant="secondary" className="ml-1">
                  {scenario.probability}
                </Badge>
              </Button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="size-5 text-primary" />
                  Timeline Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-4xl font-bold">
                    {scenarios.find(s => s.id === activeScenario)?.timeline}
                  </div>
                  <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                    <BarChart3 className="size-16 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="size-5 text-success" />
                  Budget Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-4xl font-bold">
                    {scenarios.find(s => s.id === activeScenario)?.budget}
                  </div>
                  <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                    <TrendingUp className="size-16 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-warning/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="size-5 text-warning" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-4xl font-bold">
                    {scenarios.find(s => s.id === activeScenario)?.risk}
                  </div>
                  <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                    <TrendingDown className="size-16 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Side-by-Side Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 font-semibold">Metric</th>
                      {scenarios.map(s => (
                        <th key={s.id} className="text-left py-4 px-4 font-semibold">{s.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">Timeline</td>
                      {scenarios.map(s => (
                        <td key={s.id} className="py-4 px-4 font-medium">{s.timeline}</td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">Budget</td>
                      {scenarios.map(s => (
                        <td key={s.id} className="py-4 px-4 font-medium">{s.budget}</td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">Risk Level</td>
                      {scenarios.map(s => (
                        <td key={s.id} className="py-4 px-4">
                          <Badge variant={
                            s.risk === 'Low' ? 'default' : 
                            s.risk === 'Medium' ? 'secondary' : 
                            'destructive'
                          }>
                            {s.risk}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-4 px-4">Probability</td>
                      {scenarios.map(s => (
                        <td key={s.id} className="py-4 px-4 font-medium">{s.probability}</td>
                      ))}
                    </tr>
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
