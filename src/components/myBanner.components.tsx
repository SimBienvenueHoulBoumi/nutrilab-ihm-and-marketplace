import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MyBanner() {
    return (
        <>
            <div className="flex my-10 w-4/6 m-auto flex-col md:flex-row justify-center items-center md:space-x-4">
                <Image
                    src="/images/salade-de-fruits.jpg"
                    alt="banner"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg shadow-blue-300"
                />
                <div className="flex flex-col space-y-2 text-center md:text-left p-3 my-2">
                    <p className="font-bold text-2xl">Let’s immortalize our passion for gastronomy</p>
                    <p className='text-[15px] w-4/6'>
                        Immortalizing our passion for gastronomy means preserving
                        and celebrate this culinary art that unites people around the world.
                    </p>
                    <div className='mt-4 space-y-2'>
                        <div className="bg-[#20847D] hover:bg-[#BAE7D9] hover:cursor-pointer max-w-40 text-white font-bold py-2 px-4 rounded flex items-center space-x-2">
                            <Link href="/register">
                                <p className="text-black">Join us now! {` `}✉️</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

