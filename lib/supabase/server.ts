import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

function getEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }

  if (!supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }

  return { supabaseUrl, supabaseAnonKey }
}

export async function createClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnvVars()
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
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
