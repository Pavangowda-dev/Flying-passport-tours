// apps/admin/proxy.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export default async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const url = request.nextUrl

  // Protected routes
  const isProtectedRoute = url.pathname.startsWith('/dashboard')

  // Login page
  const isLoginPage = url.pathname === '/login'

  if (isProtectedRoute && !session) {
    // Not logged in → redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isLoginPage && session) {
    // Already logged in → go to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Refresh session if needed
  await supabase.auth.getSession()

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
  ],
}