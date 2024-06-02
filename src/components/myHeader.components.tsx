'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { isTokenHere, cleanAndRemoveToken } from '@/services/auth.service';

import { useRouter } from 'next/navigation'

export default function MyHeader() {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const authStatus = await isTokenHere();
            setIsAuthenticated(authStatus);
        }
        checkAuth();
    }, []);

    function logout() {
        cleanAndRemoveToken();
        window.location.href = '/';
        window.location.reload();
    }

    return (
        <div className="flex w-full justify-between mx-4 py-4">
            <div className='uppercase'>Nutrilab</div>
            <div className="space-x-4 mx-2 flex text-center flex-row font-black text-black text-[15px] capitalize">
                {isAuthenticated ? (
                    <>
                        <div>
                            <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/marketplace">Marketplace</Link>
                        </div>
                        <form onSubmit={() => logout()}>
                            <button className='border-0 hover:border-b-2 hover:border-[#20847D]'>logout</button>
                        </form>
                    </>
                ) : (
                    <>
                        <div>
                            <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/login">Login</Link>
                        </div>
                        <div>
                            <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/register">Register</Link>
                        </div>
                    </>
                )}
                <div>
                    <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/">Home</Link>
                </div>
            </div>
        </div>
    );
}
