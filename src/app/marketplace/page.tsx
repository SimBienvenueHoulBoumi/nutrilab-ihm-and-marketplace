"use client"

import React, { useEffect, useState } from 'react'

import { fetchExternalCategory } from '@/services/external.api.service';
import { Category } from '@/types/externaleApi.types';

export default function Marketplace() {
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
            <div className='flex max-h-full'>
                <div className='w-1/6 p-2 m-1'>
                    <p className='font-extrabold uppercase p-1 text-xs'>all our diversities</p>
                    <div className='space-y-2'>
                        {Array.isArray(categories) && categories.map((category, index) => (
                            <div
                                key={index}
                                className='block hover:cursor-pointer hover:text-orange-400 px-4 text-sm font-medium text-gray-500'
                                onClick={() => setSelectedCategory(category.strCategory)}
                            >
                                {category.strCategory}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full m-1'>
                    {selectedCategory ? selectedCategory : 'display here'}
                </div>
            </div>
        </>
    );
}
