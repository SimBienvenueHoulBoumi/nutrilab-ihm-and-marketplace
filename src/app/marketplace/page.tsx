'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';
import ArticleDetails from '@/components/articleDetails.components';
import ArticlesGrid from '@/components/articleFilter.components';
import Article from '@/interfaces/article.interface';

import { getArticles } from '@/services/nutrilab.article.service';

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
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await getArticles();
            setArticles(response);
        } catch (error) {
            console.error('Failed to fetch articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredArticles = selectedContinent
        ? articles.filter((article) => article.area === selectedContinent)
        : articles;

    const closeModal = () => {
        setSelectedArticle(null);
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeModal();
        }
    }, [modalRef]);

    useEffect(() => {
        if (selectedArticle) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside, selectedArticle]);

    if (loading) {
        return (
            <div className="flex justify-center items-center bg-gradient-to-r from-[#9bee75] to-[#DFAF2C] min-h-screen">
                <ClipLoader color="#20847D" size={50} />
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-[#9bee75] to-[#DFAF2C] min-h-screen">
            <div className="flex flex-col space-y-4 px-4 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-6">
                <div className="w-full py-2">
                    <div className="flex flex-wrap gap-2 text-white">
                        {continents.map((continent, index) => (
                            <div
                                key={index}
                                className="block hover:cursor-pointer rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700"
                                onClick={() => setSelectedContinent(continent.name)}
                            >
                                {continent.name}
                            </div>
                        ))}
                    </div>
                    <Link href="/create-meal" className="bg-blue-500 mt-2 p-2 hover:bg-blue-700 text-white font-bold rounded block w-max">
                        + add new article
                    </Link>
                </div>
                <ArticlesGrid articles={filteredArticles} setSelectedArticle={setSelectedArticle} />
            </div>
            {selectedArticle && (
                <ArticleDetails selectedArticle={selectedArticle} closeModal={closeModal} modalRef={modalRef} />
            )}
        </div>
    );
}

export default ProductList;
