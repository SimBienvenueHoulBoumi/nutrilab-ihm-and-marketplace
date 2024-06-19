"use server"

import { cookies } from 'next/headers';
import { isValidToken } from '@/middleware';
import User from '@/interfaces/user.interface';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/interfaces/jwtPayload.interface';

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;


interface UserInfo {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
}

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

export async function getLocalUserId(): Promise<string> {
    try {
        const token = cookies().get('token')?.value;

        if (!token) {
            throw new Error('No token found');
        }

        const decodedToken = jwtDecode<JwtPayload>(token);
        return decodedToken.sub.id;
    } catch (error) {
        console.error('Error decoding token:', error);
        throw new Error('Failed to retrieve local user ID');
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

        const data = await response.json();
        return {
            id: data.sub.id,
            email: data.sub.email,
            firstname: data.sub.firstname,
            lastname: data.sub.lastname,
            role: data.role,
        } as User;
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
