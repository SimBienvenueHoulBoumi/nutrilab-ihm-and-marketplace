"use client"

import React, { useEffect, useState } from 'react';
import { fetchExternalCategory } from '@/services/external.api.service';
import { Category } from '@/types/externaleApi.types';
import Image from 'next/image';

function ProductList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const result: Category[] = await fetchExternalCategory();
                console.log('Fetched categories:', result);
                if (Array.isArray(result)) {
                    setCategories(result);
                } else {
                    throw new Error('Fetched data is not an array');
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className='flex h-full'>
                <div className='w-1/6'>
                    <p className='font-extrabold text-xl p-2'>Categories</p>
                    {Array.isArray(categories) && categories.map((category, index) => (
                        <div
                            key={index}
                            className='block hover:cursor-pointer rounded-lg px-4 py-2 my-1 mx-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            onClick={() => setSelectedCategory(category.strCategory)}
                        >
                            {category.strCategory}
                        </div>
                    ))}
                </div>
                <div className='w-full'>
                    <div className='w-full p-2 m-1'>
                        {/* {selectedCategory ? selectedCategory : <>Select your diversity</>} */}
                        <div className="wrapper max-w-xs bg-gray-50 rounded-b-md shadow-lg overflow-hidden">
                            <div className="relative w-full h-40">
                                <Image
                                    src="/images/viande.jpg"
                                    alt='viande'
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-3 space-y-3">
                                <h3 className="text-gray-700 font-semibold text-md">
                                    Nepal Mountain
                                </h3>
                                <p className="text-sm text-gray-900 leading-sm">
                                    Bienvenido a la montaña de nepal un maravilloso lugar en el
                                    que podras escalar y repirar aire limpio, serás acompoañado
                                    por profesonales en alpinismo.
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
                                        clip-rule="evenodd"
                                        fill-rule="evenodd"
                                    ></path>
                                    <path
                                        d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
                                    ></path></svg>
                                save article
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
