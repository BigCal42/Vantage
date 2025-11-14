/**
 * Section primitive with consistent spacing and responsive padding
 */
import { cn } from '@/lib/utils'
import { Container } from './container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const paddingMap = {
  none: '',
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16',
  lg: 'py-16 sm:py-24',
  xl: 'py-24 sm:py-32',
}

export function Section({ 
  children, 
  className,
  containerSize = 'xl',
  padding = 'md'
}: SectionProps) {
  return (
    <section className={cn(paddingMap[padding], className)}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  )
}
