"use server"

import { cookies } from 'next/headers';
import { isValidToken } from '@/middleware';
import User from '@/interfaces/user.interface';

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export async function VerifyUser(email: string, password: string) {
    try {
        const response = await fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            // Log the status and status text for better error diagnosis
            console.error(`Login request failed with status: ${response.status} ${response.statusText}`);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        cookies().set('token', data.access_token);
        return true;
    } catch (error) {
        console.error('Error during login:', error);
        return false;
    }
}

export async function getUserInfo(): Promise<User> {
    try {
        const token = cookies().get('token')?.value;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${url}/auth/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            // Log the status and status text for better error diagnosis
            console.error(`Profile request failed with status: ${response.status} ${response.statusText}`);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.sub;
    } catch (error) {
        console.error('Error fetching user info:', error);
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
