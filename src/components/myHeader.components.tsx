"use client"

import React from 'react'
import Link from "next/link";
import Image from "next/image";

export default function MyHeader() {
    return (
        <>
            <div className="flex w-full justify-between mx-4 py-4">
                <p className='uppercase'>Nutrilab</p>
                <div className="space-x-4 mx-2 flex text-center flex-row text-black text-[15px] capitalize">
                    <div>
                        <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/" >Home</Link>
                    </div>
                    <div>
                        <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/login" >Login</Link>
                    </div>
                    <div>
                        <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/register" >Register</Link>
                    </div>
                    <div>
                        <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/marketplace" >Marketplace</Link>
                    </div>
                </div>
            </div>
        </>
    )
}