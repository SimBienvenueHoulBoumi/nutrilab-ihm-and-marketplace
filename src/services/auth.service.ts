"use server"

import { cookies } from 'next/headers';
import { isValidToken } from '@/middleware';

import User from '@/interfaces/user.interface';

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export default async function VerifyUser(email: string, password: string) {
    try {
        const response = await fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
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

export async function getUserInfo(): Promise<User> {
    try {
        const response = await fetch(`${url}/auth/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies().get('token')?.value}`
            }
        });

        const data = await response.json();
        return data.sub;
    } catch (error) {
        throw new Error('Network response was not ok');
    }
}

export async function isTokenHere(): Promise<boolean> {
    const token = cookies().get('token')?.value || "";
    return isValidToken(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_EXTERNAL_SECRET_KEY));
}

export async function cleanAndRemoveToken(): Promise<void> {
    const cookieStore = cookies();
    cookieStore.delete('token');
}
