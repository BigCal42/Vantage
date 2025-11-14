import { createBrowserClient } from '@supabase/ssr'

function getEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build time, return placeholder values if env vars not set
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
      // During build, use placeholder values
      return { 
        supabaseUrl: 'https://placeholder.supabase.co',
        supabaseAnonKey: 'placeholder-key'
      }
    }
    // At runtime, throw errors
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
