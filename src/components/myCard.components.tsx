import React from 'react'
import Image from 'next/image'

export default function MyCard({
    image,
    Button,
    CardDescription,
    btnHref,
    isMarketable,
}: {
    image: string,
    Button: string,
    CardDescription: string,
    btnHref: string,
    isMarketable: boolean,
}) {
    return (
        <>
            {/*  */}

            <div className="overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
                <Image src={image} width={300} height={10} alt="" className="w-full" />
                <div className="p-8 text-center sm:p-9 md:p-5 xl:p-7">
                    {isMarketable ?
                        <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
                            {CardDescription}
                        </p> : ""
                    }
                    {Button && (
                        <a
                            href={btnHref ? btnHref : "#"}
                            className="inline-block  rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:bg-gray-500 dark:border-dark-3 dark:text-dark-6"
                        >
                            {Button}
                        </a>
                    )}
                </div>
            </div>
            {/*  */}
        </>
    );
}
