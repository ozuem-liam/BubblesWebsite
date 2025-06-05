import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { WEB_DOMAIN } from './lib/api'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname, search } = request.nextUrl

  if (!token && isProtectedRoute(pathname)) {
    const signInUrl = new URL('/auth/sign-in', request.url)

    const fromPath = pathname + search
    signInUrl.searchParams.set('from', fromPath)

    return NextResponse.redirect(signInUrl)
  }

  if (token && pathname.startsWith('/auth')) {
    const url = new URL(request.url)
    const fromParam = url.searchParams.get('from')

    if (fromParam && isValidRedirectPath(fromParam)) {
      return NextResponse.redirect(new URL(fromParam, request.url))
    }

    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = ['/dashboard']
  return protectedRoutes.some((route) => pathname.startsWith(route))
}

function isValidRedirectPath(path: string): boolean {
  // Only allow internal paths and specific allowed routes
  const allowedPaths = ['/dashboard']

  try {
    if (!path.startsWith('/')) {
      return false
    }

    const url = new URL(path, WEB_DOMAIN)
    const pathname = url.pathname

    if (pathname.includes('..') || pathname.includes('//')) {
      return false
    }

    return allowedPaths.some((allowedPath) => pathname.startsWith(allowedPath))
  } catch {
    return false
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}
