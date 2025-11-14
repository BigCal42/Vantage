/**
 * Container primitive with consistent max-width and responsive padding
 */
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: boolean
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[1800px]',
  full: 'max-w-full',
}

export function Container({ 
  children, 
  className, 
  size = 'xl',
  padding = true 
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        containerSizes[size],
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  )
}
