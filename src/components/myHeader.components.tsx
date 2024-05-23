import React from 'react'
import Link from "next/link";
import Image from "next/image";

import { cookies } from 'next/headers'

export default function MyHeader() {
    return (
        <>
            <div className="bg-[#DFAF2C] w-full flex justify-between">
                <div className="space-x-4 my-auto flex ml-4">
                    <Image
                        src="/images/logo.png"
                        width={50}
                        height={50}
                        alt="logo"/>
                    <p className="py-4 font-bold uppercase">nutrilab</p>
                </div>
                <div className="space-x-4 py-4 mx-2 flex flex-row text-[15px] capitalize">
                    <div>
                        <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/" >Home</Link>
                    </div>
                    <div>
                        <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/login" >Login</Link>
                    </div>
                    <div>
                        <Link className='border-0 hover:border-b-2 hover:border-[#20847D]' href="/register" >Register</Link>
                    </div>
                </div>
            </div>
        </>
    )
}