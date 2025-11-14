'use client'

import { useEffect, useState } from 'react'

interface ProgressRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
  label?: string
  showLabel?: boolean
}

export function ProgressRing({ 
  percentage, 
  size = 120, 
  strokeWidth = 8,
  label,
  showLabel = true
}: ProgressRingProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const getColor = () => {
    if (percentage >= 85) return 'text-success'
    if (percentage >= 70) return 'text-primary'
    if (percentage >= 50) return 'text-warning'
    return 'text-destructive'
  }

  const getGradientId = () => {
    if (percentage >= 85) return 'gradient-success'
    if (percentage >= 70) return 'gradient-primary'
    if (percentage >= 50) return 'gradient-warning'
    return 'gradient-destructive'
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.50 0.20 264)" />
            <stop offset="100%" stopColor="oklch(0.65 0.18 220)" />
          </linearGradient>
          <linearGradient id="gradient-success" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.55 0.20 145)" />
            <stop offset="100%" stopColor="oklch(0.70 0.18 165)" />
          </linearGradient>
          <linearGradient id="gradient-warning" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.20 65)" />
            <stop offset="100%" stopColor="oklch(0.75 0.18 45)" />
          </linearGradient>
          <linearGradient id="gradient-destructive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.50 0.22 25)" />
            <stop offset="100%" stopColor="oklch(0.60 0.20 10)" />
          </linearGradient>
        </defs>
        
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/10"
        />
        
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${getGradientId()})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? offset : circumference}
          className="transition-all duration-[1200ms] ease-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold tracking-tight ${getColor()} ${size > 150 ? 'text-5xl' : size > 100 ? 'text-4xl' : 'text-3xl'}`}>
          {percentage}
        </span>
        {showLabel && label && (
          <span className="mt-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
