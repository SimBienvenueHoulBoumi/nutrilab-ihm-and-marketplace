"use server"

import { cookies } from 'next/headers';
import { isValidToken } from '@/middleware';

export default async function VerifyUser(username: string, password: string): Promise<boolean> {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        cookies().set('token', data.access_token);
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export async function isTokenHere(): Promise<boolean> {
    const token = cookies().get('token')?.value || "";
    return isValidToken(token, new TextEncoder().encode(process.env.SECRET_KEY));
}

export async function cleanAndRemoveToken(): Promise<void> {
    const cookieStore = cookies();
    cookieStore.delete('token');
}
