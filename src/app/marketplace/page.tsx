"use client"

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import ArticleDetails from "@/components/articleDetails.components";
import ArticlesGrid from "@/components/articleFilter.components";
import Article from "@/interfaces/article.interface";
import { FavoriteDto } from "@/interfaces/favorite.interface"; // Import de FavoriteDto
import { getArticles } from "@/services/nutrilab.article.service";
import { addFavorite, deleteFavorite, findOneFavorite } from "@/services/nutrilab.favorite.service";

const continents = [
  { name: "Africa" },
  { name: "Asia" },
  { name: "Europe" },
  { name: "North America" },
  { name: "South America" },
  { name: "Australia" },
  { name: "Antarctica" },
];

interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = ({}) => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultContinent = localStorage.getItem("selectedContinent");
    const continentExists = continents.some(
      (continent) => continent.name === defaultContinent
    );

    if (defaultContinent && continentExists) {
      setSelectedContinent(defaultContinent);
    } else {
      setSelectedContinent(null);
    }

    fetchArticles();
  }, []);

  useEffect(() => {
    if (selectedContinent) {
      localStorage.setItem("selectedContinent", selectedContinent);
    }
  }, [selectedContinent]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await getArticles();
      setArticles(response);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
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

  const addToFavorites = async (articleId: string, isFavorite: boolean) => {
    try {
      if (isFavorite) {
        const article = articles.find((article) => article.id === articleId);
        if (!article) {
          throw new Error("Article not found");
        }
        const favoriteDto: FavoriteDto = {
          name: article.name,
        };
        await addFavorite(articleId, favoriteDto);
        console.log("Added to favorites:", article.name);
      } else {
        console.log("Remove from favorite", articleId);
        const favoriteToDelete = await findOneFavorite(articleId);
        if (favoriteToDelete) {
          await deleteFavorite(favoriteToDelete.id);
          console.log("Removed from favorites:", favoriteToDelete.name);
        } else {
          console.log("Favorite not found for deletion");
        }
      }
    } catch (error) {
      console.error("Failed to add/remove favorite:", error);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="flex flex-col space-y-4 px-4 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-6">
        <div className="w-full">
          <div className="flex flex-wrap gap-2 text-black">
            {continents.map((continent, index) => (
              <div
                key={index}
                className={`block hover:cursor-pointer rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-700 ${
                  selectedContinent === continent.name
                    ? "bg-gray-100 text-gray-700"
                    : ""
                }`}
                onClick={() => setSelectedContinent(continent.name)}
              >
                {continent.name}
              </div>
            ))}
          </div>
          <Link
            href="/create-meal"
            className="bg-blue-500 mt-2 p-2 hover:bg-blue-700 text-white font-bold rounded block w-max"
          >
            + add new article
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : filteredArticles.length > 0 ? (
          <ArticlesGrid
            articles={filteredArticles}
            setSelectedArticle={setSelectedArticle}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                  No articles found.
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Choose another category for more options.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedArticle && (
        <ArticleDetails
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
          closeModal={closeModal}
          modalRef={modalRef}
        />
      )}
    </div>
  );
};

export default ProductList;
