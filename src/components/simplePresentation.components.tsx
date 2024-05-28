import React from 'react'
import Link from 'next/link'

export default function SimplePresentation() {
  return (
    <>
      <h1 className="font-bold text-2xl">Let’s immortalize our passion for gastronomy</h1>
      <p className='text-[15px] w-4/6'>
        Immortalizing our passion for gastronomy means preserving
        and celebrate this culinary art that unites people around the world.
        By documenting and sharing recipes via videos and manuscripts
        we pass on our know-how
        and our traditions to future generations. Through recipes, shared
        your know-how in order to benefit everyone.
      </p>
      <div className='mt-4 space-y-2'>
        <p className='italic text-gray-500'>Still don&apos;t have an account? </p>
        <div className="bg-[#20847D] hover:bg-[#a2c9bc] hover:cursor-pointer max-w-40 text-white font-bold py-2 px-4 rounded flex items-center space-x-2">
          <Link href="/register">
            <p className="text-black">Join us now! {` `}✉️</p>
          </Link>
        </div>
      </div>
    </>
  )
}
