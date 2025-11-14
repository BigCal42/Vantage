'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, AlertTriangle, TrendingUp, Clock } from 'lucide-react'

type StreamingRisk = {
  id: string
  title: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  recommendation: string
  tokens: string[]
}

export function StreamingDiagnose() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [risks, setRisks] = useState<StreamingRisk[]>([])
  const [currentTokens, setCurrentTokens] = useState<string>('')

  const startDiagnosis = async () => {
    setIsAnalyzing(true)
    setRisks([])
    setCurrentTokens('')

    // Simulate streaming AI response
    const mockRisks: StreamingRisk[] = [
      {
        id: '1',
        title: 'Vendor Delivery Velocity Declining',
        severity: 'high',
        description: 'Analysis of vendor delivery patterns shows concerning deceleration...',
        recommendation: 'Escalate to vendor executive sponsor immediately...',
        tokens: []
      },
      {
        id: '2',
        title: 'Critical Knowledge Silo Detected',
        severity: 'critical',
        description: 'Architect Jamie is single point of failure for integration layer...',
        recommendation: 'Initiate immediate knowledge transfer program...',
        tokens: []
      },
      {
        id: '3',
        title: 'Budget Trajectory Misalignment',
        severity: 'medium',
        description: 'Spending velocity analysis predicts 30-40% overspend in Phase 3...',
        recommendation: 'Secure $1.8M contingency approval now...',
        tokens: []
      }
    ]

    for (const risk of mockRisks) {
      // Stream each risk token by token
      const fullText = `${risk.title}. ${risk.description} ${risk.recommendation}`
      const words = fullText.split(' ')
      
      let accumulated = ''
      for (const word of words) {
        accumulated += word + ' '
        setCurrentTokens(accumulated)
        await new Promise(resolve => setTimeout(resolve, 50))
      }

      // Add complete risk
      setRisks(prev => [...prev, { ...risk, tokens: words }])
      setCurrentTokens('')
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    setIsAnalyzing(false)
  }

  const severityConfig = {
    critical: { color: 'text-red-500', bg: 'bg-red-500/10', icon: AlertTriangle },
    high: { color: 'text-orange-500', bg: 'bg-orange-500/10', icon: TrendingUp },
    medium: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: Clock },
    low: { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Sparkles },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Diagnosis</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Deep analysis to uncover hidden risks
          </p>
        </div>
        <Button 
          onClick={startDiagnosis}
          disabled={isAnalyzing}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          {isAnalyzing ? 'Analyzing...' : 'Run Diagnosis'}
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {risks.map((risk, index) => {
          const config = severityConfig[risk.severity]
          const Icon = config.icon

          return (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg border p-6 ${config.bg}`}
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-lg p-2 ${config.bg}`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{risk.title}</h3>
                    <span className={`text-xs font-medium uppercase ${config.color}`}>
                      {risk.severity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                  <div className="rounded-lg bg-background/50 p-4 border">
                    <p className="text-sm font-medium mb-1">Recommendation</p>
                    <p className="text-sm text-muted-foreground">{risk.recommendation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}

        {currentTokens && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border p-6 bg-muted/50"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-lg p-2 bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-sm">{currentTokens}</p>
                <motion.div 
                  className="inline-block w-2 h-4 bg-primary ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAnalyzing && risks.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p>Click "Run Diagnosis" to start AI analysis</p>
        </div>
      )}
    </div>
  )
}
