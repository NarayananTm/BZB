import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register', '/admin/login', '/api/login', '/api/register', '/api/logout'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = request.cookies.get('bzb_token')?.value || request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token && pathname.startsWith('/bzb')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!token && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}
