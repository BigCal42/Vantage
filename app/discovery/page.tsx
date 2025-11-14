'use client'

import { useState } from 'react'
import { ContextBar } from '@/components/context-bar'
import { MainNavigation } from '@/components/main-navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export default function DiscoveryPage() {
  const [step, setStep] = useState(1)
  const totalSteps = 5

  const steps = [
    { number: 1, label: 'Domain', description: 'What are you implementing?' },
    { number: 2, label: 'Scope', description: 'Define your project scope' },
    { number: 3, label: 'Constraints', description: 'Timeline and budget' },
    { number: 4, label: 'Stakeholders', description: 'Who\'s involved?' },
    { number: 5, label: 'Review', description: 'Confirm your details' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <ContextBar />
      <MainNavigation />
      
      <main className="ml-64 p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">Discovery Wizard</h1>
            <p className="text-lg text-muted-foreground">
              Let's understand your transformation project
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.number} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "flex size-10 items-center justify-center rounded-full border-2 font-semibold transition-all",
                      step > s.number && "bg-success border-success text-white",
                      step === s.number && "border-primary bg-primary text-white",
                      step < s.number && "border-muted bg-card text-muted-foreground"
                    )}>
                      {step > s.number ? <Check className="size-5" /> : s.number}
                    </div>
                    <span className={cn(
                      "text-xs font-medium transition-colors",
                      step >= s.number ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={cn(
                      "h-0.5 w-20 mx-2 transition-colors",
                      step > s.number ? "bg-success" : "bg-border"
                    )} />
                  )}
                </div>
              ))}
            </div>

            <Progress value={(step / totalSteps) * 100} className="h-2" />
          </div>

          <Card className="border-2">
            <CardContent className="p-12">
              <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold">{steps[step - 1].description}</h2>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Step {step} of {totalSteps}
                  </Badge>
                </div>

                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="system" className="text-base">What system are you implementing?</Label>
                      <Input 
                        id="system"
                        placeholder="e.g., Epic EHR, Oracle ERP, Workday"
                        className="h-12 text-base"
                      />
                    </div>

                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Sparkles className="size-5 text-primary shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">AI Suggestion</p>
                            <p className="text-xs text-muted-foreground">
                              For a 250-bed hospital, Epic implementations typically take 18-24 months. 
                              Does that sound right?
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <Label htmlFor="beds" className="text-base">Number of beds</Label>
                      <Input 
                        id="beds"
                        type="number"
                        placeholder="250"
                        className="h-12 text-base"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base">Project phases (select all that apply)</Label>
                      <div className="grid gap-3">
                        {['Planning', 'Design', 'Build', 'Testing', 'Training', 'Go-Live'].map((phase) => (
                          <label key={phase} className="flex items-center gap-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors">
                            <input type="checkbox" className="size-4" defaultChecked />
                            <span className="font-medium">{phase}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(Math.min(totalSteps, step + 1))}
                    className="gap-2"
                  >
                    {step === totalSteps ? 'Complete' : 'Continue'}
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
