'use client'

import { ContextBar } from '@/components/context-bar'
import { MainNavigation } from '@/components/main-navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ResourcesPage() {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
  const roles = [
    { name: 'Project Manager', data: [60, 80, 95, 70] },
    { name: 'Architect', data: [75, 90, 105, 80] },
    { name: 'Developer', data: [85, 95, 110, 90] },
    { name: 'QA Engineer', data: [70, 85, 100, 75] },
    { name: 'Change Manager', data: [50, 60, 75, 80] }
  ]

  const getColor = (value: number) => {
    if (value >= 100) return 'bg-destructive text-destructive-foreground'
    if (value >= 80) return 'bg-warning text-warning-foreground'
    return 'bg-success/20 text-success'
  }

  return (
    <div className="min-h-screen bg-background">
      <ContextBar />
      <MainNavigation />
      
      <main className="ml-64 p-8">
        <div className="mx-auto max-w-[1600px] space-y-8">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight">Resource Planner</h1>
            <p className="text-lg text-muted-foreground">
              Capacity planning and team allocation heat map
            </p>
          </div>

          <Card className="border-warning/20 bg-warning/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="size-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Developer Shortage in Q3</h3>
                  <p className="text-sm text-muted-foreground">
                    Team is over-allocated by 10%. Recommend hiring contractors now or expect 6-week delay.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Capacity Heat Map</CardTitle>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded bg-success/20" />
                    <span className="text-muted-foreground">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded bg-warning" />
                    <span className="text-muted-foreground">Near Capacity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded bg-destructive" />
                    <span className="text-muted-foreground">Over-allocated</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold border-b">Role</th>
                        {quarters.map(q => (
                          <th key={q} className="text-center py-4 px-6 font-semibold border-b">{q}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {roles.map((role, i) => (
                        <tr key={i} className="border-b hover:bg-muted/30">
                          <td className="py-6 px-6 font-medium">{role.name}</td>
                          {role.data.map((value, j) => (
                            <td key={j} className="py-6 px-6">
                              <div className={cn(
                                "flex items-center justify-center rounded-lg py-4 px-6 font-semibold transition-all hover:scale-105 cursor-pointer",
                                getColor(value)
                              )}>
                                {value}%
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
