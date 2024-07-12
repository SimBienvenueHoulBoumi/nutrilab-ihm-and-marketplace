import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getFavorites,
  deleteFavorite,
} from "@/services/nutrilab.favorite.service";
import Favorite from "@/interfaces/favorite.interface";

interface FavoritesSectionProps {}

const FavoritesSection: React.FC<FavoritesSectionProps> = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      setFavorites(await getFavorites());
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast("Error fetching favorites", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFavorite = async (favoriteId: string) => {
    try {
      await deleteFavorite(favoriteId);
      toast("Favorite deleted successfully", { type: "success" });
      fetchFavorites(); 
    } catch (error) {
      toast("Error deleting favorite", { type: "error" });
    }
  };

  const goToDetails = (articleId: string) => {
    window.location.href = `/marketplace/article-details/${articleId}`;
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <></>
      ) : favorites.length === 0 ? null : (
        <div className="border-1 border-solid bg-white border-gray-300 shadow-md rounded-md p-6">
          <h2 className="text-3xl font-bold text-gray-900">Favorites</h2>
          <ul className="mt-4 space-y-2">
            {favorites.length > 0 &&
              favorites.map((favorite) => (
                <li
                  key={favorite.id}
                  className="flex items-center justify-between border-b border-gray-300 py-2"
                >
                  <div>
                    <p className="text-sm font-semibold">{favorite.name}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="text-red-600 text-xs"
                      onClick={() => handleDeleteFavorite(favorite.id)}
                    >
                      delete
                    </button>
                    <button
                      className="text-green-600 text-xs"
                      onClick={() => goToDetails(favorite.articleId)}
                    >
                      Details
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;
