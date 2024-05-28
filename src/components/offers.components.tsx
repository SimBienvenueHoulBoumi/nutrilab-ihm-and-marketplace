import React from 'react'
import Image from 'next/image'


function Offres() {
    return (
        <div className="w-5/6 mt-4 m-auto space-y-4 text-black text-left px-4 py-auto sm:px-6 lg:px-8">
            <div>
                <p className='text-lg font-bold'>
                    Treat yourself to your favorite foods
                </p>
                <p>
                    The dishes have diverse origins and varied compositions
                </p>

            </div>
            <div className='grid grid-cols-3 gap-2'>
                <Image
                    src="/images/salade-de-fruits.jpg"
                    alt="banner"
                    width={650}
                    height={650}
                    className="rounded-lg"
                />

                <Image
                    src="/images/salade-de-fruits.jpg"
                    alt="banner"
                    width={650}
                    height={650}
                    className="rounded-lg"
                />

                <Image
                    src="/images/salade-de-fruits.jpg"
                    alt="banner"
                    width={650}
                    height={650}
                    className="rounded-lg"
                />
            </div>

        </div>
    )
}

export default Offres