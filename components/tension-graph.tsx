'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Info } from 'lucide-react'
import { useState } from 'react'

interface Node {
  id: string
  label: string
  x: number
  y: number
  tension: 'high' | 'medium' | 'low'
  description: string
}

interface Edge {
  from: string
  to: string
  tension: number
  label: string
}

const nodes: Node[] = [
  { id: 'timeline', label: 'Timeline', x: 50, y: 20, tension: 'high', description: 'Q4 2025 go-live deadline' },
  { id: 'scope', label: 'Scope', x: 80, y: 40, tension: 'high', description: '23 features requested' },
  { id: 'budget', label: 'Budget', x: 20, y: 40, tension: 'medium', description: '$12M allocated' },
  { id: 'quality', label: 'Quality', x: 50, y: 60, tension: 'medium', description: '8 defects outstanding' },
  { id: 'team', label: 'Team Capacity', x: 20, y: 80, tension: 'high', description: '94% utilization' },
  { id: 'risk', label: 'Risk', x: 80, y: 80, tension: 'high', description: '67% confidence score' }
]

const edges: Edge[] = [
  { from: 'timeline', to: 'scope', tension: 0.9, label: 'More features = longer timeline' },
  { from: 'budget', to: 'quality', tension: 0.7, label: 'Cutting costs impacts quality' },
  { from: 'team', to: 'timeline', tension: 0.85, label: 'Overloaded team slows delivery' },
  { from: 'scope', to: 'budget', tension: 0.8, label: 'More scope increases cost' },
  { from: 'quality', to: 'risk', tension: 0.75, label: 'Defects increase failure risk' },
  { from: 'team', to: 'quality', tension: 0.8, label: 'Burnout reduces quality' }
]

export function TensionGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const tensionColors = {
    high: 'stroke-destructive fill-destructive/20',
    medium: 'stroke-warning fill-warning/20',
    low: 'stroke-success fill-success/20'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Project Tension Map
            <Info className="size-4 text-muted-foreground" />
          </CardTitle>
          <Badge variant="outline" className="bg-muted">
            Force-Directed View
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Visualizing competing forces and stress points across project dimensions
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[4/3] bg-muted/20 rounded-xl border border-border/40">
          <svg className="w-full h-full">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="currentColor" className="text-muted-foreground/40" />
              </marker>
            </defs>

            <g className="edges">
              {edges.map((edge, i) => {
                const fromNode = nodes.find(n => n.id === edge.from)
                const toNode = nodes.find(n => n.id === edge.to)
                if (!fromNode || !toNode) return null

                const strokeWidth = edge.tension * 3
                const opacity = edge.tension * 0.6 + 0.2

                return (
                  <g key={i}>
                    <line
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      stroke="currentColor"
                      strokeWidth={strokeWidth}
                      opacity={opacity}
                      markerEnd="url(#arrowhead)"
                      className={`transition-all ${
                        edge.tension > 0.8 ? 'text-destructive' : 
                        edge.tension > 0.6 ? 'text-warning' : 
                        'text-muted-foreground'
                      }`}
                    />
                    {/* Tension label */}
                    <text
                      x={`${(fromNode.x + toNode.x) / 2}%`}
                      y={`${(fromNode.y + toNode.y) / 2}%`}
                      className="text-[10px] fill-muted-foreground"
                      textAnchor="middle"
                    >
                      {Math.round(edge.tension * 100)}%
                    </text>
                  </g>
                )
              })}
            </g>

            <g className="nodes">
              {nodes.map((node) => (
                <g
                  key={node.id}
                  transform={`translate(${node.x}%, ${node.y}%)`}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="cursor-pointer transition-all hover:scale-110"
                >
                  <circle
                    r="28"
                    className={`${tensionColors[node.tension]} stroke-2 transition-all`}
                  />
                  <text
                    textAnchor="middle"
                    dy="0.3em"
                    className="text-xs font-semibold fill-foreground pointer-events-none"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </g>
          </svg>

          {hoveredNode && (
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-card border border-border rounded-lg shadow-lg animate-slide-in">
              <div className="text-sm font-semibold mb-1">
                {nodes.find(n => n.id === hoveredNode)?.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {nodes.find(n => n.id === hoveredNode)?.description}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">High Tension</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Medium Tension</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Low Tension</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
