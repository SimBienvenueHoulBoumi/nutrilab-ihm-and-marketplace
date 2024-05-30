"use server"
import { cookies } from 'next/headers'

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