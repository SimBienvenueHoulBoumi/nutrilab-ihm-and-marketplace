"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Article from "@/interfaces/article.interface";
import {
  getFavorites,
  findOneFavorite,
  addFavorite,
  deleteFavorite,
} from "@/services/nutrilab.favorite.service";

interface ArticlesGridProps {
  articles: Article[];
  setSelectedArticle: (article: Article | null) => void;
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({
  articles,
  setSelectedArticle,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const favs = await getFavorites();
        setFavorites(favs.map((fav: any) => fav.articleId));
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    }
    fetchFavorites();
  }, []);

  const toggleFavorite = async (articleId: string) => {
    try {
      const existingFavorite = await findOneFavorite(articleId);

      if (existingFavorite) {
        await deleteFavorite(existingFavorite.id);
        setFavorites((prevFavorites) =>
          prevFavorites.filter((favId) => favId !== articleId)
        );
      } else {
        await addFavorite(articleId, {
          name: articleId,
        });
        setFavorites((prevFavorites) => [...prevFavorites, articleId]);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const goToDetails = (id: string) => {
    window.location.href = `/marketplace/article-details/${id}`;
  };

  return (
    <div className="w-full py-2 mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {articles.map((article, index) => {
        const isFavorite = favorites.includes(article.id);
        return (
          <div
            key={index}
            className="bg-gray-50 rounded-md shadow-lg overflow-hidden flex flex-col relative"
          >
            <div className="relative">
              <Image
                src="/images/salade-de-fruits.jpg" // Replace with article image source
                alt={article.name}
                width={300}
                height={450}
                priority
                className="w-full h-48 object-cover p-2 hover:cursor-pointer"
                onClick={() => goToDetails(article.id)}
              />
              <div
                className={`absolute p-2 top-2 right-2 bg-transparent border-none cursor-pointer z-10 transition duration-300`}
                onClick={() => toggleFavorite(article.id)}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill={isFavorite ? "yellow" : "none"}
                  stroke={isFavorite ? "yellow" : "currentColor"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="p-3 flex-grow flex flex-col">
              <h3 className="text-gray-700 font-semibold text-md mb-2">
                {article.name}
              </h3>
            </div>
            <div className="flex justify-between items-center px-3 py-2 bg-gray-200">
              <button
                onClick={() => setSelectedArticle(article)}
                className="bg-[#d1c590] flex justify-center py-1 px-4 text-white font-semibold transition duration-300 hover:bg-[#e2ca5d]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 1-2.25 2.25M3.75 7.5h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesGrid;
