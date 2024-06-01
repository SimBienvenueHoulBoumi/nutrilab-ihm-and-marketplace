"use client";

import React, { useEffect, useState } from 'react';
import { fetchExternalCategory } from '@/services/external.api.service';
import { Category } from '@/types/externaleApi.types';

function ProductList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const result: Category = await fetchExternalCategory();
                // Affichez la réponse pour vérifier sa structure
                console.log('API Response:', result);

            } catch (err) {
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
            <div>
                <h1>Categories</h1>
                <div>
                    {categories.map((category, index) => (
                        <div key={index}>{category.strCategory}</div>
                    ))}
                </div>
            </div>
            <div>
                <h1>Filters</h1>
            </div>
        </>
    );
}

export default ProductList;