import { createBrowserClient } from '@supabase/ssr'

function getEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // For browser clients, validate environment variables
  // NEXT_PUBLIC_* vars are embedded at build time and should be available at runtime
  if (!supabaseUrl || !supabaseAnonKey) {
    // During build/SSR (when window is undefined), use placeholders to allow build to complete
    // At browser runtime (when window is defined), env vars should be available, so throw errors
    if (typeof window === 'undefined') {
      // Build/SSR time: use placeholders to prevent build failures
      // These will be replaced with actual values if env vars are set at build time
      return { 
        supabaseUrl: supabaseUrl || 'https://placeholder.supabase.co',
        supabaseAnonKey: supabaseAnonKey || 'placeholder-key'
      }
    }
    
    // Browser runtime: throw errors if env vars are missing
    // NEXT_PUBLIC_* vars should be embedded at build time
    if (!supabaseUrl) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
    }
    if (!supabaseAnonKey) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
    }
  }

  return { supabaseUrl, supabaseAnonKey }
}

export function createClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnvVars()
  return createBrowserClient(supabaseUrl as string, supabaseAnonKey as string)
}
