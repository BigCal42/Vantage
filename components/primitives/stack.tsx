/**
 * Stack primitive for consistent vertical spacing
 */
import { cn } from '@/lib/utils'

interface StackProps {
  children: React.ReactNode
  className?: string
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  direction?: 'vertical' | 'horizontal'
}

const spacingMap = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
}

export function Stack({ 
  children, 
  className, 
  spacing = 'md',
  direction = 'vertical'
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        spacingMap[spacing],
        className
      )}
    >
      {children}
    </div>
  )
}
