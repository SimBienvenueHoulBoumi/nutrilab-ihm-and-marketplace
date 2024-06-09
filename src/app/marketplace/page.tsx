"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const continents = [
    { name: 'Africa' },
    { name: 'Asia' },
    { name: 'Europe' },
    { name: 'North America' },
    { name: 'South America' },
    { name: 'Australia' },
    { name: 'Antarctica' }
];

function ProductList() {
    const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

    return (
        <>
            <div className='flex'>
                <div className='w-1/6'>
                    <p className='font-extrabold text-md p-2'>Continents</p>
                    <div className='py-2'>
                        {continents.map((continent, index) => (
                            <div
                                key={index}
                                className='block hover:cursor-pointer rounded-lg px-4 py-1 my-1 mx-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                onClick={() => setSelectedContinent(continent.name)}
                            >
                                {continent.name}
                            </div>
                        ))}
                    </div>
                    <Link href={`create-meal`} className="bg-blue-500 my-4 mx-2 py-2 px-4 hover:bg-blue-700 text-white font-bold rounded">
                        + add new article
                    </Link>
                </div>
                <div className='w-full'>
                    <div className='w-full p-2 m-1'>
                        <div className="wrapper max-w-xs bg-gray-50 rounded-b-md shadow-lg overflow-hidden">
                            <div className="relative w-full h-40">
                                <Image
                                    src="/images/viande.jpg"
                                    alt='viande'
                                    width={500}
                                    height={500}
                                    objectFit="cover"
                                    layout="responsive"
                                />
                            </div>
                            <div className="p-3 space-y-3">
                                <h3 className="text-gray-700 font-semibold text-md">
                                    {selectedContinent ? `${selectedContinent} Selected` : 'Select a Continent'}
                                </h3>
                                <p className="text-sm p-2 text-gray-900 leading-sm">
                                    Bienvenido a la montaña de Nepal, un maravilloso lugar en el
                                    que podrás escalar y respirar aire limpio. Serás acompañado
                                    por profesionales en alpinismo.
                                </p>
                            </div>
                            <button
                                className="bg-[#20847D] w-full flex justify-center py-2 text-white font-semibold transition duration-300 hover:bg-teal-500"
                            >
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    className="h-6 mr-1 text-white"
                                >
                                    <path
                                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    ></path>
                                    <path
                                        d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
                                    ></path></svg>
                                Save article
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
