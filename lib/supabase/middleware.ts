import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function getEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build time, return placeholder values if env vars not set
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production') {
      // During build, use placeholder values
      return { 
        supabaseUrl: 'https://placeholder.supabase.co',
        supabaseAnonKey: 'placeholder-key'
      }
    }
    // At runtime in development, throw errors
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

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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

