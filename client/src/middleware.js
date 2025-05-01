import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // If the user is not logged in and trying to access protected routes
  if (!token && pathname.startsWith('/dashboard')) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }

  // If the user is logged in and trying to access auth pages
  if (token && (pathname === '/login' || pathname === '/register')) {
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}; 