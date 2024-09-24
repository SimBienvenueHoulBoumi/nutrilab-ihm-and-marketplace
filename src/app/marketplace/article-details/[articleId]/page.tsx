"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getArticleById } from "@/services/nutrilab.article.service";
import { getIngredients } from "@/services/nutrilab.ingredient.service";
import {
  addFavorite,
  findOneFavorite,
  getFavorites,
} from "@/services/nutrilab.favorite.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClimbingBoxLoader, ClipLoader } from "react-spinners";

import { getLocalUserId } from "@/services/auth.service";
import Article from "@/interfaces/article.interface";
import { Ingredient } from "@/interfaces/ingredient.interface";
import Favorite, { FavoriteDto } from "@/interfaces/favorite.interface";

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
  const [selectedTab, setSelectedTab] = useState<"description" | "reviews">(
    "description"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticle = await getArticleById(articleId);
        const fetchedIngredients = await getIngredients(articleId);
        const userId = await getLocalUserId();
        setLocalUserId(userId);

        const fetchedFavorites = await getFavorites();
        const filteredFavorites = Array.isArray(fetchedFavorites)
          ? fetchedFavorites.filter((favorite) => favorite.userId === userId)
          : [];

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

  const handleAddToFavorite = async () => {
    if (article && localUserId) {
      try {
        const existingFavorite = await findOneFavorite(articleId);

        if (existingFavorite && existingFavorite.userId === localUserId) {
          toast.info("Article is already in favorites");
        } else {
          const favoriteDto: FavoriteDto = { name: article.name };
          await addFavorite(articleId, favoriteDto);
          toast.success("Article added to favorites");

          const addedFavorite = await findOneFavorite(articleId);
          if (addedFavorite) {
            setFavorites([
              ...favorites,
              { ...addedFavorite, userId: localUserId },
            ]);
            window.location.reload();
          } else {
            console.error("Failed to retrieve added favorite");
          }
        }
      } catch (error) {
        console.error("Error adding article to favorites:", error);
        toast.error("Error adding article to favorites");
      }
    }
  };

  const isFavorite = favorites.some((fav) => fav.articleId === articleId);
  const isArticleOwnedByUser = article?.userId === localUserId;

  console.log(favorites);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  return (
    <div className="font-sans p-8 tracking-wide max-lg:max-w-2xl mx-auto">
      <ToastContainer />
      <div>
        <h2 className="text-2xl font-extrabold text-gray-800">
          {article?.name}
        </h2>
      </div>

      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
        <Image
          src="/images/salade-de-fruits.jpg"
          alt="Product Image"
          className="w-full max-h-full object-contain object-top"
          width={500}
          height={500}
        />

        <div>
          <ul className="flex border-b justify-between items-start space-x-2 flex-col sm:flex-row">
            <div className="flex space-x-4 m-2">
              <li
                className={`${
                  selectedTab === "description"
                    ? "text-gray-800 font-bold border-b-2 border-gray-800 bg-gray-100"
                    : "text-gray-600 font-bold hover:bg-gray-100"
                } py-3 px-8 cursor-pointer transition-all`}
                onClick={() => setSelectedTab("description")}
              >
                Description
              </li>
              <li
                className={`${
                  selectedTab === "reviews"
                    ? "text-gray-800 font-bold border-b-2 border-gray-800 bg-gray-100"
                    : "text-gray-600 font-bold hover:bg-gray-100"
                } py-3 px-8 cursor-pointer transition-all sm:my-0`}
                onClick={() => setSelectedTab("reviews")}
              >
                Reviews
              </li>
            </div>
              <button
                onClick={handleAddToFavorite}
                className={`px-6 py-3 my-2 mx-0 rounded-lg font-semibold text-white transition-all ${
                  isFavorite || isArticleOwnedByUser
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={isFavorite || isArticleOwnedByUser}
              >
                {isFavorite || isArticleOwnedByUser
                  ? isArticleOwnedByUser
                    ? "Add Yours"
                    : "In Favorites"
                  : "Add"}
              </button>
          </ul>

          <div className="text-sm text-gray-600 mt-4">
            {selectedTab === "description" ? (
              <div className="space-y-2 list-disc m-2 text-sm text-gray-600">
                {ingredients.length > 0 ? (
                  ingredients.map((ingredient, index) => (
                    <div key={index} className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <strong>{ingredient.name} :</strong>
                        <span>
                          {ingredient.dosage} {ingredient.labelDosage}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {article?.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="m-2">No ingredients found for this article.</p>
                )}
              </div>
            ) : (
              <div className="m-2">{article?.preparation}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
