'use client';

import React from 'react';
import Link from "next/link";

export default function MyHeader() {
    return (
        <div className="flex w-full justify-between mx-4 py-4">
            <div className='uppercase'>Nutrilab</div>
            <div className="space-x-4 mx-2 flex text-center flex-row font-black text-black text-[15px] capitalize">

                <div>
                    <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/marketplace">Marketplace</Link>
                </div>
                <div className='flex space-x-2'>
                    <div>
                        <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/login">Login</Link>
                    </div>
                    <div>
                        <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/register">Register</Link>
                    </div>
                </div>
                <div>
                    <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/">Home</Link>
                </div>
            </div>
        </div>
    );
}
