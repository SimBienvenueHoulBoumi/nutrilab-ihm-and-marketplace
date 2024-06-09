import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { JwtPayload } from './interfaces/jwtPayload.interface'; 


const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);

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

    let response = NextResponse.next();
    response.headers.set('X-Path', path);
    response.headers.set('X-Token', token ? 'present' : 'absent');

    if (isPublicPage && await isValidToken(token, SECRET_KEY)) {
        response.headers.set('X-Redirect', 'home');
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPage && !(await isValidToken(token, SECRET_KEY))) {
        response.headers.set('X-Redirect', 'login');
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    return response;
}

export const config = {
    matcher: [
        '/marketplace', '/login', '/register'
    ],
};
