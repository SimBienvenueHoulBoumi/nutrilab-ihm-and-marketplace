"use server"
import { cookies } from 'next/headers'
import { isValidToken } from '@/middleware';

export default async function VerifyUser(username: string, password: string): Promise<void> {
    await fetch(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            const cookieStore = cookies()
            cookieStore.set('token', data.access_token)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function isTokenHere(): Promise<boolean> {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value || ""
    return isValidToken(token, new TextEncoder().encode(process.env.SECRET_KEY))
}