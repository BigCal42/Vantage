/**
 * Design system utility tokens to keep layout and typography consistent.
 */

export const spacingTokens = {
  sectionY: 'py-12 sm:py-16 lg:py-24',
  containerX: 'px-4 sm:px-6 lg:px-8',
}

export const layoutTokens = {
  container: `max-w-7xl mx-auto ${spacingTokens.containerX}`,
  stackLg: 'flex flex-col gap-6',
  stackXl: 'flex flex-col gap-12',
}

export const typographyTokens = {
  heroHeading: 'text-display',
  sectionHeading: 'text-title',
  bodyMuted: 'text-base text-muted-foreground',
}

