import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the session cookie
  const userId = request.cookies.get('user_id')?.value;

  // 2. Define which paths are protected
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/bookings') || 
                          request.nextUrl.pathname.startsWith('/hotels');

  // 3. Define auth routes (don't show login page if already logged in)
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || 
                      request.nextUrl.pathname.startsWith('/register');

  if (isProtectedRoute && !userId) {
    // Redirect to login if trying to access private pages without a cookie
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && userId) {
    // Redirect to hotels if already logged in and trying to access login/register
    return NextResponse.redirect(new URL('/hotels', request.url));
  }

  return NextResponse.next();
}

// 4. Specify which routes the middleware should ignore (static files, images, etc.)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};