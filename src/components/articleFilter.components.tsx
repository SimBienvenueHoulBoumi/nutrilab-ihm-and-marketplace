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
                        height={450}
                        className="w-full h-48 object-cover p-2"
                    />
                    <div className="p-3 flex-grow flex flex-col">
                        <h3 className="text-gray-700 font-semibold text-md mb-2">
                            {article.name}
                        </h3>
                    </div>
                    <button
                        onClick={() => setSelectedArticle(article)}
                        className="bg-[#d1c590] w-full flex justify-center py-2 space-x-2 space-y-2 text-white font-semibold transition duration-300 hover:bg-[#e2ca5d]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                        </svg>

                        Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ArticlesGrid;
