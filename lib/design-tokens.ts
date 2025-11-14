/**
 * Vantage Design System
 * Centralized design tokens for consistent spacing, typography, and responsive design
 */

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
} as const

export const typography = {
  // Font sizes with optimal line heights
  xs: { fontSize: '0.75rem', lineHeight: '1rem' },       // 12px
  sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },   // 14px
  base: { fontSize: '1rem', lineHeight: '1.5rem' },      // 16px
  lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },   // 18px
  xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },    // 20px
  '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },     // 24px
  '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },// 30px
  '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },  // 36px
  '5xl': { fontSize: '3rem', lineHeight: '1' },          // 48px
  '6xl': { fontSize: '3.75rem', lineHeight: '1' },       // 60px
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  glow: '0 0 15px rgb(var(--primary) / 0.5)',
} as const
