'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PackageCheck, TrendingDown, AlertTriangle, ExternalLink, Clock } from 'lucide-react'

interface VendorHealth {
  id: string
  name: string
  category: string
  health_score: number
  signals: {
    stock_change: number
    glassdoor_rating: number
    glassdoor_trend: 'up' | 'down' | 'stable'
    support_response_time: number
    support_trend: 'improving' | 'degrading' | 'stable'
  }
  risks: string[]
  last_checked: string
}

const vendors: VendorHealth[] = [
  {
    id: '1',
    name: 'Epic Systems',
    category: 'EHR Platform',
    health_score: 72,
    signals: {
      stock_change: -8.5,
      glassdoor_rating: 3.2,
      glassdoor_trend: 'down',
      support_response_time: 48,
      support_trend: 'degrading'
    },
    risks: ['Support velocity declining', 'Employee sentiment low'],
    last_checked: '5 minutes ago'
  },
  {
    id: '2',
    name: 'DataMigration Co',
    category: 'Integration Partner',
    health_score: 88,
    signals: {
      stock_change: 12.3,
      glassdoor_rating: 4.1,
      glassdoor_trend: 'stable',
      support_response_time: 4,
      support_trend: 'stable'
    },
    risks: [],
    last_checked: '5 minutes ago'
  }
]

export function VendorHealthDashboard() {
  return (
    <Card className="p-6 border-2 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <PackageCheck className="size-5 text-primary" />
            <h3 className="text-lg font-semibold">Vendor Health Monitor</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            External signals and stability tracking
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3" />
          <span>Real-time</span>
        </div>
      </div>

      <div className="space-y-3">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className={`p-4 rounded-lg border-2 transition-all space-y-3 ${
              vendor.health_score < 75 
                ? 'bg-destructive/5 border-destructive/30' 
                : 'bg-card hover:bg-accent/5'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold">{vendor.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {vendor.category}
                  </Badge>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className={`text-2xl font-bold tabular-nums ${
                  vendor.health_score < 75 ? 'text-destructive' : 'text-success'
                }`}>
                  {vendor.health_score}
                </div>
                <div className="text-xs text-muted-foreground">health</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Stock Price</div>
                <div className={`font-semibold tabular-nums flex items-center gap-1 ${
                  vendor.signals.stock_change < 0 ? 'text-destructive' : 'text-success'
                }`}>
                  {vendor.signals.stock_change > 0 && '+'}
                  {vendor.signals.stock_change}%
                  {vendor.signals.stock_change < 0 && <TrendingDown className="size-3" />}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Glassdoor</div>
                <div className="font-semibold tabular-nums flex items-center gap-1">
                  {vendor.signals.glassdoor_rating}/5.0
                  {vendor.signals.glassdoor_trend === 'down' && (
                    <TrendingDown className="size-3 text-destructive" />
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Support Time</div>
                <div className={`font-semibold tabular-nums ${
                  vendor.signals.support_response_time > 24 ? 'text-warning' : 'text-success'
                }`}>
                  {vendor.signals.support_response_time}h avg
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Trend</div>
                <Badge variant={vendor.signals.support_trend === 'degrading' ? 'destructive' : 'outline'} className="text-xs">
                  {vendor.signals.support_trend}
                </Badge>
              </div>
            </div>

            {vendor.risks.length > 0 && (
              <div className="pt-3 border-t border-border/50 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-destructive">
                  <AlertTriangle className="size-3" />
                  Active Risks
                </div>
                <div className="space-y-1">
                  {vendor.risks.map((risk, i) => (
                    <div key={i} className="text-sm text-muted-foreground">
                      • {risk}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-border/50">
              <Button size="sm" variant="outline" className="gap-1.5 w-full">
                <ExternalLink className="size-3" />
                View Full Analysis
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
