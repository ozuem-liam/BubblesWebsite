import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  
  const token = request.cookies.get('token')?.value

  if (!token && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  return NextResponse.next()
}

function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = ['/dashboard']
  return protectedRoutes.some((route) => pathname.startsWith(route))
}

export const config = {
  matcher: ['/dashboard/:path*'],
}