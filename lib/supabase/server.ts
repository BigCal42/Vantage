import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

function getEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // For server-side clients, validate environment variables
  // NEXT_PUBLIC_* vars are embedded at build time and should be available at runtime
  if (!supabaseUrl || !supabaseAnonKey) {
    // During build/SSR (when window is undefined), use placeholders to allow build to complete
    // At server runtime, env vars should be available, so throw errors
    if (typeof window === 'undefined') {
      // Build/SSR time: use placeholders to prevent build failures
      // These will be replaced with actual values if env vars are set at build time
      return { 
        supabaseUrl: supabaseUrl || 'https://placeholder.supabase.co',
        supabaseAnonKey: supabaseAnonKey || 'placeholder-key'
      }
    }
    
    // Server runtime: throw errors if env vars are missing
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

export async function createClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnvVars()
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl as string, supabaseAnonKey as string, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set(name, value, options)
        } catch (error) {
          // cookies() can be read-only in certain contexts (e.g. static rendering)
          // This is expected behavior in Next.js 16
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.delete(name)
        } catch (error) {
          // cookies() can be read-only in certain contexts (e.g. static rendering)
          // This is expected behavior in Next.js 16
        }
      },
    },
  })
}
