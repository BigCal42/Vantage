import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function getEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // For middleware clients, validate environment variables
  // NEXT_PUBLIC_* vars are embedded at build time and should be available at runtime
  // Middleware runs at the edge where window is undefined
  if (!supabaseUrl || !supabaseAnonKey) {
    // During build/edge runtime (when window is undefined), use placeholders to allow build to complete
    // At edge runtime, env vars should be available, so throw errors
    if (typeof window === 'undefined') {
      // Build/edge time: use placeholders to prevent build failures
      // These will be replaced with actual values if env vars are set at build time
      return { 
        supabaseUrl: supabaseUrl || 'https://placeholder.supabase.co',
        supabaseAnonKey: supabaseAnonKey || 'placeholder-key'
      }
    }
    
    // Edge runtime: throw errors if env vars are missing
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

/**
 * Creates a Supabase client for use in Next.js middleware.
 * This helper manages cookies for authentication state in middleware context.
 * 
 * Note: Middleware runs at the edge and uses request/response cookies directly,
 * not the async cookies() API from next/headers.
 * 
 * @param request - The Next.js request object
 * @param response - The Next.js response object (optional, will create if not provided)
 * @returns Object containing the Supabase client and updated response
 */
export function createMiddlewareClient(
  request: NextRequest,
  response?: NextResponse
) {
  const { supabaseUrl, supabaseAnonKey } = getEnvVars()
  const responseToUse = response ?? NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(supabaseUrl as string, supabaseAnonKey as string, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        })
        responseToUse.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options,
        })
        responseToUse.cookies.set({
          name,
          value: '',
          ...options,
        })
      },
    },
  })

  return {
    supabase,
    response: responseToUse,
  }
}

