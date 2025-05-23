import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for token in cookies (where your login flow stores it)
  const token = request.cookies.get('token')?.value;

  // If no token and trying to access protected routes
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/auth/sign-in', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in but tries to access pages
  if (token && (request.nextUrl.pathname.startsWith('/auth/sign-in') || 
                request.nextUrl.pathname.startsWith('/auth/sign-up'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/sign-in',
    '/auth/sign-up'
  ],
};