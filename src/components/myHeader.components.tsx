"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { isTokenHere, cleanAndRemoveToken } from '@/services/auth.service';
import Image from 'next/image';

export default function MyHeader() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const authStatus = await isTokenHere();
            setIsAuthenticated(authStatus);
        }
        checkAuth();
    }, []);

    async function logout() {
        setLoading(true);
        await cleanAndRemoveToken();
        setIsAuthenticated(false);

        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    }

    return (
        <div className="flex w-full justify-between bg-[#87cacc] py-2 px-10">
            <div className="uppercase flex items-center space-x-2">
                <Image src="/images/logo.png" alt="Nutrilab" width={30} height={30} />
                <span>Nutrilab</span>
            </div>
            {isAuthenticated ? (
                <div className="space-x-4 py-1 flex text-center flex-row font-black text-black text-[15px] capitalize items-center">
                    <Link className="border-0 hover:text-[#6a5fc9]" href="/marketplace">
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 block sm:hidden">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                            </svg>
                            <span className="hidden sm:block">Marketplace</span>
                        </div>
                    </Link>
                    <Link className="border-0 hover:text-[#6a5fc9] flex flex-col items-center" href="/">
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 block sm:hidden">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            <span className="hidden sm:block">Home</span>
                        </div>
                    </Link>
                    <Link className="border-0 hover:text-[#6a5fc9]" href="/profile">
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 block sm:hidden">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <span className="hidden sm:block">Profile</span>
                        </div>
                    </Link>
                    <button
                        onClick={logout}
                        disabled={loading}
                        className={`border-0 flex hover:text-red-500 items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >

                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 block sm:hidden">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            </svg>
                            <span className="hidden sm:block">Logout</span>
                        </div>
                    </button>
                </div>
            ) : null}
        </div>
    );
}
