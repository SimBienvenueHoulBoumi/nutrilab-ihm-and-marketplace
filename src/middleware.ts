import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { JwtPayload } from './interfaces/jwtPayload.interface';

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);


export async function isValidToken(token: string, secret: Uint8Array): Promise<boolean> {
    try {
        const { payload } = await jwtVerify(token, secret) as { payload: JwtPayload };
        return payload.sub.role === 'user';
    } catch (e) {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPage = ['/login', '/register', '/forgot-password', '/reset-password'].includes(path);
    const token = request.cookies.get('token')?.value || "";

    const isTokenValid = await isValidToken(token, SECRET_KEY);

    if (isPublicPage && isTokenValid) {
        return NextResponse.redirect(new URL("/marketplace", request.nextUrl));
    }

    if (!isPublicPage && !isTokenValid) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/marketplace',
        '/profile',
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password'
    ],
};
