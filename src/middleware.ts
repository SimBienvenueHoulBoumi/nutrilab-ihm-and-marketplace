"use server"

import isValidToken from './utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (token) {
    if (!isValidToken(token) && (request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isValidToken(token) && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
      return NextResponse.redirect(new URL('/marketplace', request.url));
    }
  } else if (request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.webp$|.*\\.ico$).*)',
  ],
};