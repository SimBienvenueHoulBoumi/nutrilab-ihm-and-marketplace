import React from 'react';
import Image from 'next/image';
import Article from '@/interfaces/article.interface';

interface ArticlesGridProps {
    articles: Article[];
    setSelectedArticle: (article: Article) => void;
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({ articles, setSelectedArticle }) => {
    return (
        <div className="w-full py-2 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles.map((article, index) => (
                <div key={index} className="bg-gray-50 rounded-md shadow-lg overflow-hidden flex flex-col">
                    <Image
                        src="/images/salade-de-fruits.jpg"
                        alt={article.name}
                        width={300}
                        height={400}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-3 flex-grow flex flex-col">
                        <h3 className="text-gray-700 font-semibold text-md mb-2">
                            {article.name}
                        </h3>
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
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 0 0110 13a22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                            ></path>
                            <path
                                d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"
                            ></path>
                        </svg>
                        Save article
                    </button>
                    <button
                        onClick={() => setSelectedArticle(article)}
                        className="bg-[#d1c590] w-full flex justify-center py-2 text-white font-semibold transition duration-300 hover:bg-[#e2ca5d]"
                    > 
                        Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ArticlesGrid;
