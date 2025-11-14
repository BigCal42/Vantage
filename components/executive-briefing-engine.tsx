'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Send, Download, Calendar, Edit3, Sparkles, Clock, User, TrendingUp, AlertTriangle, CheckCircle2, Mail, FileDown, Presentation } from 'lucide-react'
import { toast } from 'sonner'

interface Stakeholder {
  id: string
  name: string
  role: string
  avatar: string
  focusAreas: string[]
  preferredFormat: 'detailed' | 'summary' | 'visual'
  lastBriefing: string
}

interface BriefingSection {
  title: string
  content: string
  metrics?: { label: string; value: string; trend: 'up' | 'down' | 'stable' }[]
  editable: boolean
}

const stakeholders: Stakeholder[] = [
  {
    id: 'cfo',
    name: 'Jennifer Martinez',
    role: 'CFO',
    avatar: 'JM',
    focusAreas: ['Budget', 'ROI', 'Cash Flow'],
    preferredFormat: 'summary',
    lastBriefing: '3 days ago'
  },
  {
    id: 'cio',
    name: 'David Chen',
    role: 'CIO',
    avatar: 'DC',
    focusAreas: ['Architecture', 'Security', 'Integration'],
    preferredFormat: 'detailed',
    lastBriefing: '1 week ago'
  },
  {
    id: 'ceo',
    name: 'Sarah Williams',
    role: 'CEO',
    avatar: 'SW',
    focusAreas: ['Timeline', 'Risk', 'Strategic Impact'],
    preferredFormat: 'visual',
    lastBriefing: '2 days ago'
  }
]

export function ExecutiveBriefingEngine() {
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder>(stakeholders[0])
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [briefingSections, setBriefingSections] = useState<BriefingSection[]>([])

  const generateBriefing = async () => {
    setGenerating(true)
    
    // Simulate AI generation with streaming effect
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const sections: BriefingSection[] = [
      {
        title: 'Executive Summary',
        content: `The Mercy Valley EHR transformation remains on track with 87% overall health score. Key focus this week: budget velocity has increased 15%, consuming contingency buffer faster than planned. Recommend budget review meeting with Finance by Friday.`,
        editable: true
      },
      {
        title: 'Financial Performance',
        content: `Current spend: $4.2M of $10M total budget (42%). Trending 8% over pace based on timeline completion. Primary drivers: contractor rates 15% higher than estimated, vendor integration work requiring additional hours.`,
        metrics: [
          { label: 'Budget Utilization', value: '42%', trend: 'up' },
          { label: 'Projected Overrun', value: '$320K', trend: 'down' },
          { label: 'ROI Timeline', value: '18 months', trend: 'stable' }
        ],
        editable: true
      },
      {
        title: 'Critical Decisions Required',
        content: `1) Approve additional $45K contractor budget for Q3 (decision needed by Friday)\n2) Review vendor SLA compliance - support response times degraded 40%\n3) Approve scope change request from Clinical Operations (adds 3 weeks, $80K)`,
        editable: true
      },
      {
        title: 'Risks & Mitigation',
        content: `High risk: Vendor delivery velocity declining (detected 2 weeks ago). Mitigation in progress: weekly escalation meetings with vendor executive sponsor, contractual penalties review. Medium risk: Knowledge concentration with Lead Architect Jamie - implementing knowledge transfer plan.`,
        editable: true
      }
    ]
    
    setBriefingSections(sections)
    setGenerated(true)
    setGenerating(false)
    
    toast.success('Briefing generated for ' + selectedStakeholder.name)
  }

  const handleSendBriefing = () => {
    toast.success('Briefing sent to ' + selectedStakeholder.name, {
      description: 'Delivered via email with read receipt tracking'
    })
  }

  const handleScheduleMeeting = () => {
    toast.success('Meeting scheduled with ' + selectedStakeholder.name, {
      description: 'Calendar invite sent for tomorrow 2pm (30 minutes)'
    })
  }

  const handleExport = (format: 'pdf' | 'pptx' | 'email') => {
    const formatNames = { pdf: 'PDF', pptx: 'PowerPoint', email: 'Email' }
    toast.success(`Exported as ${formatNames[format]}`, {
      description: 'Download starting...'
    })
  }

  return (
    <Card className="border-2 shadow-xl">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <h3 className="text-lg font-semibold">Executive Briefing Engine</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-generated, stakeholder-specific project updates
            </p>
          </div>
          <Badge variant="outline" className="bg-primary/10 border-primary/30">
            Saves 15h/week
          </Badge>
        </div>

        {/* Stakeholder Selection */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Select Stakeholder
          </label>
          <div className="grid grid-cols-3 gap-2">
            {stakeholders.map(stakeholder => (
              <button
                key={stakeholder.id}
                onClick={() => {
                  setSelectedStakeholder(stakeholder)
                  setGenerated(false)
                }}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  selectedStakeholder.id === stakeholder.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-sm text-primary flex-shrink-0">
                    {stakeholder.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{stakeholder.name}</div>
                    <div className="text-xs text-muted-foreground">{stakeholder.role}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Last: {stakeholder.lastBriefing}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Focus Areas */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Focus Areas for {selectedStakeholder.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedStakeholder.focusAreas.map(area => (
              <Badge key={area} variant="secondary">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        {!generated && (
          <Button 
            className="w-full gap-2 group h-12" 
            size="lg"
            onClick={generateBriefing}
            disabled={generating}
          >
            {generating ? (
              <>
                <div className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>Generating briefing...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-4 transition-transform group-hover:rotate-12" />
                <span>Generate Briefing for {selectedStakeholder.role}</span>
              </>
            )}
          </Button>
        )}

        {/* Generated Briefing */}
        {generated && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-success" />
                <span>Generated for {selectedStakeholder.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="gap-1"
              >
                <Edit3 className="size-3" />
                {editMode ? 'Preview' : 'Edit'}
              </Button>
            </div>

            {/* Briefing Sections */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {briefingSections.map((section, idx) => (
                <Card key={idx} className="p-4 border">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    {section.title}
                    {section.title === 'Executive Summary' && (
                      <Badge variant="outline" className="text-xs">
                        {selectedStakeholder.preferredFormat}
                      </Badge>
                    )}
                  </h4>
                  
                  {editMode && section.editable ? (
                    <Textarea
                      defaultValue={section.content}
                      className="min-h-20 text-sm"
                      placeholder="Edit content..."
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </p>
                  )}

                  {section.metrics && (
                    <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t">
                      {section.metrics.map((metric, i) => (
                        <div key={i} className="space-y-1">
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold tabular-nums">{metric.value}</span>
                            {metric.trend === 'up' && <TrendingUp className="size-3 text-warning" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="default"
                className="gap-2 h-11"
                onClick={handleSendBriefing}
              >
                <Send className="size-4" />
                Send via Email
              </Button>
              <Button
                variant="outline"
                className="gap-2 h-11"
                onClick={handleScheduleMeeting}
              >
                <Calendar className="size-4" />
                Schedule Review
              </Button>
            </div>

            {/* Export Options */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 flex-1"
                onClick={() => handleExport('pdf')}
              >
                <FileDown className="size-3" />
                PDF
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 flex-1"
                onClick={() => handleExport('pptx')}
              >
                <Presentation className="size-3" />
                PowerPoint
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 flex-1"
                onClick={() => handleExport('email')}
              >
                <Mail className="size-3" />
                Email Draft
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => {
                setGenerated(false)
                toast.info('Ready to generate new briefing')
              }}
            >
              Generate New Briefing
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="pt-4 border-t grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold tabular-nums">23</div>
            <div className="text-xs text-muted-foreground">Briefings Sent</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold tabular-nums">15h</div>
            <div className="text-xs text-muted-foreground">Time Saved</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold tabular-nums">98%</div>
            <div className="text-xs text-muted-foreground">Read Rate</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
