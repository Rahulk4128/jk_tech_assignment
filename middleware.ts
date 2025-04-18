// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthenticated = !!token;

  const pathname = request.nextUrl.pathname;

  // Define public paths from navOption
  const publicPaths = ['/login', '/signup'];

  // Define protected paths from navOption
  const protectedPaths = [
    '/user-management',
    '/document-management',
    '/ingestion-management',
    '/qa-interface',
  ];

  const isPublicPath = publicPaths.includes(pathname);
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // // ✅ Case: Logged in user trying to access `/` → send to dashboard
  // if (isAuthenticated && pathname === '/') {
  //   return NextResponse.redirect(new URL('/document-management', request.url));
  // }

  // ✅ Case: Not logged in trying to access protected route
  if (!isAuthenticated && isProtectedPath) {
    return NextResponse.redirect(new URL('/', request.url)); // your public landing
  }

  // ✅ Case: Logged in and trying to access public route like /login or /signup
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/document-management', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
