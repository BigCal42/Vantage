import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const geist = Geist({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Vantage - Transformation Intelligence',
    template: '%s | Vantage',
  },
  description: 'AI-powered platform that predicts project failure before it happens. Command-driven intelligence for enterprise transformations.',
  keywords: ['project management', 'AI', 'transformation', 'enterprise', 'intelligence', 'risk management'],
  authors: [{ name: 'Vantage' }],
  creator: 'Vantage',
  metadataBase: new URL('https://vantage.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vantage.app',
    title: 'Vantage - Transformation Intelligence',
    description: 'AI-powered platform that predicts project failure before it happens.',
    siteName: 'Vantage',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vantage - Transformation Intelligence',
    description: 'AI-powered platform that predicts project failure before it happens.',
    creator: '@vantageapp',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body 
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
