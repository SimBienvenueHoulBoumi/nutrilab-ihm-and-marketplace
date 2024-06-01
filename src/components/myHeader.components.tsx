'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { isTokenHere } from '@/services/auth.service';

export default function MyHeader() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const authStatus = await isTokenHere();
            setIsAuthenticated(authStatus);
        }
        checkAuth();
    }, []);

    return (
        <div className="flex w-full justify-between mx-4 py-4">
            <div className='uppercase'>Nutrilab</div>
            <div className="space-x-4 mx-2 flex text-center flex-row font-black text-black text-[15px] capitalize">
                {isAuthenticated ? (
                    <div>
                        <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/marketplace">Marketplace</Link>
                    </div>
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
                <div>
                    <button className='border-0 hover:border-b-2 hover:border-[#20847D]'>logout</button>
                </div>
            </div>
        </div>
    );
}
