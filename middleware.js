import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (pathname === '/' || pathname.startsWith('/signup') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Redirect if no token on protected routes
  if (!token && pathname.startsWith('/(authenticated)')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect logged-in users away from login/signup pages
  if (token && (pathname === '/' || pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/(authenticated)/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signup', '/(authenticated)/:path*'],
};
