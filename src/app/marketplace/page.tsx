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

const articles = [
    {
        title: 'Exploring the Alps',
        image: '/images/salade-de-fruits.jpg',
        description: 'Experience the stunning beauty of the Alps with guided tours and breathtaking views.',
        area: 'Europe',
    },
    {
        title: 'Safari in Africa',
        image: '/images/salade-de-fruits.jpg',
        description: 'Join us for an unforgettable safari adventure in the heart of Africa.',
        area: 'Africa',
    },
    {
        title: 'Cultural Wonders of Asia',
        image: '/images/salade-de-fruits.jpg',
        description: 'Discover the rich cultural heritage and modern marvels of Asia.',
        area: 'Asia',
    },
    {
        title: 'Amazon Rainforest',
        image: '/images/salade-de-fruits.jpg',
        description: 'Explore the diverse wildlife and lush greenery of the Amazon Rainforest.',
        area: 'South America',
    },
    {
        title: 'Beaches of Australia',
        image: '/images/salade-de-fruits.jpg',
        description: 'Relax on the beautiful beaches of Australia, with golden sands and clear blue waters.',
        area: 'Australia',
    },
    {
        title: 'Antarctic Expeditions',
        image: '/images/salade-de-fruits.jpg',
        description: 'Embark on an expedition to Antarctica and witness the icy landscapes and unique wildlife.',
        area: 'Antarctica',
    },
];

function ProductList() {
    const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

    const filteredArticles = selectedContinent
        ? articles.filter(article => article.area === selectedContinent)
        : articles;

    return (
        <>
            <div className="flex flex-col space-y-4 px-24">
                <div className="w-full py-2">
                    <div className="flex flex-wrap gap-2">
                        {continents.map((continent, index) => (
                            <div
                                key={index}
                                className="block hover:cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
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
                <div className="w-full py-2 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredArticles.map((article, index) => (
                        <div key={index} className="bg-gray-50 rounded-md shadow-lg overflow-hidden flex flex-col">
                            <div className="relative w-full h-40 sm:h-32 md:h-40 lg:h-48">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-md"
                                />
                            </div>
                            <div className="p-3 flex-grow flex flex-col">
                                <h3 className="text-gray-700 font-semibold text-md mb-2">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-900 flex-grow">
                                    {article.description}
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
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductList;
