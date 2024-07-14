"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getArticleById } from "@/services/nutrilab.article.service";
import { getIngredients } from "@/services/nutrilab.ingredient.service";
import Article from "@/interfaces/article.interface";
import { Ingredient } from "@/interfaces/ingredient.interface";
import {
  addFavorite,
  findOneFavorite,
  getFavorites,
} from "@/services/nutrilab.favorite.service";
import Favorite, { FavoriteDto } from "@/interfaces/favorite.interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

import { getLocalUserId } from "@/services/auth.service";

interface ArticleDetailProps {
  params: {
    articleId: string;
  };
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ params }) => {
  const { articleId } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [localUserId, setLocalUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticle = await getArticleById(articleId);
        const fetchedIngredients = await getIngredients(articleId);
        const userId = await getLocalUserId();
        setLocalUserId(userId);

        let fetchedFavorites = await getFavorites();
        if (!Array.isArray(fetchedFavorites)) {
          fetchedFavorites = [];
        }

        const filteredFavorites = fetchedFavorites.filter(
          (favorite: Favorite) => favorite.userId === userId
        );

        setArticle(fetchedArticle);
        setIngredients(fetchedIngredients);
        setFavorites(filteredFavorites);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [articleId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  const handleAddToFavorite = async () => {
    if (article && localUserId) {
      try {
        const favorite = await findOneFavorite(articleId);

        if (favorite && favorite.userId === localUserId) {
          toast("Article is already in favorites", { type: "info" });
        } else {
          const favoriteDto: FavoriteDto = {
            name: article.name,
          };

          await addFavorite(articleId, favoriteDto);
          toast("Article added to favorites", { type: "success" });

          const addedFavorite = await findOneFavorite(articleId);
          if (addedFavorite) {
            const newFavorite: Favorite = {
              id: addedFavorite.id,
              articleId: articleId,
              userId: localUserId,
              name: article.name,
            };

            setFavorites([...favorites, newFavorite]);
          } else {
            console.error("Failed to retrieve added favorite");
          }
        }
      } catch (error) {
        console.error("Error adding article to favorites:", error);
        toast("Error adding article to favorites", { type: "error" });
      }
    }
  };

  const isFavorite = favorites.some((fav) => fav.articleId === articleId);
  const isArticleOwnedByUser = article?.userId === localUserId;

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div className="px-4 py-5 sm:px-6">
              <button
                onClick={handleAddToFavorite}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  isFavorite || isArticleOwnedByUser
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
                disabled={isFavorite || isArticleOwnedByUser}
              >
                {isFavorite || isArticleOwnedByUser
                  ? "Added to Favorite"
                  : "Add to Favorite"}
              </button>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">
                Article Details
              </h1>
              <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Title</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {article?.name}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {article?.description}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Area</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {article?.area}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Ingredients
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {ingredients.length > 0 ? (
                      ingredients.map((ingredient, index) => (
                        <div key={index} className="mb-1">
                          <strong>{ingredient.name}:</strong>{" "}
                          {ingredient.dosage} {ingredient.labelDosage}
                        </div>
                      ))
                    ) : (
                      <p>No ingredients found for this article.</p>
                    )}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Preparation
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {article?.preparation}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="hidden md:block">
              <Image
                src="/images/salade-de-fruits.jpg"
                alt="Product"
                className="w-full h-full max-h-80 p-2 object-cover"
                height={300}
                width={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
