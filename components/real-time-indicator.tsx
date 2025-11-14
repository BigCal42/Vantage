'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Wifi, WifiOff } from 'lucide-react'

export function RealTimeIndicator() {
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Simulate real-time connection
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const timeAgo = () => {
    const seconds = Math.floor((Date.now() - lastUpdate.getTime()) / 1000)
    if (seconds < 10) return 'just now'
    if (seconds < 60) return `${seconds}s ago`
    return `${Math.floor(seconds / 60)}m ago`
  }

  return (
    <Badge 
      variant="outline" 
      className={`gap-1.5 ${
        isConnected 
          ? 'bg-success/10 text-success border-success/30' 
          : 'bg-destructive/10 text-destructive border-destructive/30'
      }`}
    >
      {isConnected ? (
        <Wifi className="size-3" />
      ) : (
        <WifiOff className="size-3" />
      )}
      <span className="text-xs">Live · {timeAgo()}</span>
    </Badge>
  )
}
