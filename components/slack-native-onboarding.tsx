'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Zap, MessageSquare, Clock, Users } from 'lucide-react'

export function SlackNativeOnboarding() {
  const [step, setStep] = useState<'intro' | 'scanning' | 'complete'>('intro')
  const [projectsFound, setProjectsFound] = useState(0)

  const startScan = () => {
    setStep('scanning')
    // Simulate project discovery
    let found = 0
    const interval = setInterval(() => {
      found++
      setProjectsFound(found)
      if (found >= 3) {
        clearInterval(interval)
        setTimeout(() => setStep('complete'), 500)
      }
    }, 800)
  }

  return (
    <Card className="border-2 overflow-hidden">
      <CardContent className="p-8">
        {step === 'intro' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                <Zap className="size-4" />
                Zero Setup
              </div>
              <h2 className="text-3xl font-bold">Add Vantage to Slack</h2>
              <p className="text-muted-foreground text-lg">
                No forms. No data entry. No training required. Vantage learns from your existing workspace.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="size-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Auto-Discovery</div>
                  <div className="text-sm text-muted-foreground">
                    Reads your Slack channels to detect active projects, stakeholders, and timelines
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="size-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                  <Clock className="size-5 text-success" />
                </div>
                <div>
                  <div className="font-semibold mb-1">5-Minute Intelligence</div>
                  <div className="text-sm text-muted-foreground">
                    Starts analyzing risks, dependencies, and budget velocity immediately
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="size-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                  <Users className="size-5 text-warning" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Team Collaboration</div>
                  <div className="text-sm text-muted-foreground">
                    Every team member gets insights in Slack. No separate login required.
                  </div>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full gap-2" onClick={startScan}>
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
              </svg>
              Connect to Slack Workspace
            </Button>
          </div>
        )}

        {step === 'scanning' && (
          <div className="space-y-8 text-center py-8">
            <div className="space-y-3">
              <div className="mx-auto size-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <Zap className="size-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Scanning Your Workspace</h3>
              <p className="text-muted-foreground">
                Analyzing channels, messages, and project patterns...
              </p>
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <span className="text-sm font-medium">EHR Implementation found</span>
                <Check className="size-5 text-success" />
              </div>
              {projectsFound >= 2 && (
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg animate-slide-in">
                  <span className="text-sm font-medium">Revenue Cycle project found</span>
                  <Check className="size-5 text-success" />
                </div>
              )}
              {projectsFound >= 3 && (
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg animate-slide-in">
                  <span className="text-sm font-medium">Security Upgrade found</span>
                  <Check className="size-5 text-success" />
                </div>
              )}
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="space-y-6 text-center py-8">
            <div className="space-y-3">
              <div className="mx-auto size-20 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="size-10 text-success" />
              </div>
              <h3 className="text-2xl font-bold">Vantage is Live</h3>
              <p className="text-muted-foreground">
                Found 3 active projects. Intelligence engine is now running.
              </p>
            </div>

            <div className="space-y-2 p-6 bg-muted/50 rounded-lg text-left">
              <div className="font-semibold mb-3">What happens next:</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-success shrink-0" />
                  <span>Vantage will DM you when risks are detected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-success shrink-0" />
                  <span>Ask questions anytime: @vantage is my project on track?</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-success shrink-0" />
                  <span>Executives receive weekly briefings via email</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-success shrink-0" />
                  <span>This dashboard shows deep analysis anytime</span>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={() => setStep('intro')}>
              View Project Dashboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
