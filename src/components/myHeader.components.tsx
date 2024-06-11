'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { isTokenHere, cleanAndRemoveToken } from '@/services/auth.service';
import { ClipLoader } from 'react-spinners';

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
        cleanAndRemoveToken();
        setIsAuthenticated(false);

        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }

    return (
        <div className="flex w-full justify-between py-4">
            <div className='uppercase mx-2'>Nutrilab</div>
            {isAuthenticated ? (
                <div className="space-x-4 mx-2 flex text-center flex-row font-black text-black text-[15px] capitalize">
                    <Link className='border-0 hover:text-[#20847D]' href="/marketplace">Marketplace</Link>
                    <Link className='border-0 hover:text-[#20847D]' href="/">Home</Link>
                    <Link className='border-0 hover:text-[#20847D]' href="/profile">Profile</Link>
                    <button
                        onClick={logout}
                        disabled={loading}
                        className={`border-0 hover:text-red flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? <ClipLoader color="#000" size={20} /> : 'Logout'}
                    </button>
                </div>
            ) : ""}
        </div>
    );
}
