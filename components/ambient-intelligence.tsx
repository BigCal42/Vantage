'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Mail, FileText, Calendar, Bell } from 'lucide-react'

export function AmbientIntelligence() {
  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Intelligence Where You Work</h3>
            <p className="text-muted-foreground">
              Vantage isn't another tool to adopt. It's ambient intelligence that augments your existing workflow.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MessageSquare className="size-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold mb-1">Slack Integration</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Get DMs when risks emerge. Ask @vantage questions. Auto-posts to project channels.
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Risk Alerts</Badge>
                  <Badge variant="secondary" className="text-xs">Q&A Bot</Badge>
                  <Badge variant="secondary" className="text-xs">Channel Updates</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border">
              <div className="size-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                <Mail className="size-5 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold mb-1">Email Briefings</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Executives receive personalized updates. No login required. Looks human-written.
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Weekly Digests</Badge>
                  <Badge variant="secondary" className="text-xs">Personalized</Badge>
                  <Badge variant="secondary" className="text-xs">One-Click Actions</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border">
              <div className="size-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                <FileText className="size-5 text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold mb-1">Jira Enhancement</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Vantage comments on stories showing timeline impact. Surfaces dependencies automatically.
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Impact Analysis</Badge>
                  <Badge variant="secondary" className="text-xs">Auto-Comments</Badge>
                  <Badge variant="secondary" className="text-xs">Dependency Mapping</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border">
              <div className="size-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <Calendar className="size-5 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold mb-1">Calendar Intelligence</div>
                <div className="text-sm text-muted-foreground mb-3">
                  Auto-schedules reviews. Adds project context to meetings. Sends prep materials.
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Smart Scheduling</Badge>
                  <Badge variant="secondary" className="text-xs">Meeting Prep</Badge>
                  <Badge variant="secondary" className="text-xs">Agenda Generation</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Bell className="size-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-semibold text-primary mb-1">Zero Context Switching</div>
                <div className="text-muted-foreground">
                  PMOs work in Slack and email. Executives never log in. Developers see insights in Jira. 
                  Everyone gets intelligence in their natural workflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
