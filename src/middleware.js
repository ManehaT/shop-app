import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  console.log("Token: ", token);
  console.log("Pathname: ", pathname);

  // Public routes
  const publicPaths = ['/','/login', '/signup'];
  if (publicPaths.includes(pathname) || pathname.startsWith('/api')) {
    // Redirect logged-in users away from login/signup pages
    if (token && publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  const protectedPaths = ['/home', '/home/wishlist']; // add more protected paths here
  if (protectedPaths.includes(pathname)) {
    if (!token) {
      // Not logged in → redirect to public home/login
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Default allow
  return NextResponse.next();
}

export const config = {
  matcher: ['/','/login', '/signup', '/home', '/home/wishlist',], // matching protected paths 
};
