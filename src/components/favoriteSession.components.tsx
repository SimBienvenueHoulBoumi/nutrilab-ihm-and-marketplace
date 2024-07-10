"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

import {
  getFavorites,
  deleteFavorite,
} from "@/services/nutrilab.favorite.service";
import Favorite from "@/interfaces/favorite.interface";

interface FavoritesSectionProps {
  localUserId: string;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ localUserId }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    console.log("Fetching favorites...", localUserId);
    setLoading(true);
    try {
      console.log("fetching favorites", await getFavorites());
      const fetchedFavorites = await getFavorites();
      console.log("fetchedFavorites:", fetchedFavorites);
      setFavorites(fetchedFavorites);
      console.log("favorites:", favorites);
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
      fetchFavorites(); // Fetch favorites again after deletion
      toast("Favorite deleted successfully", { type: "success" });
    } catch (error) {
      console.error("Error deleting favorite:", error);
      toast("Error deleting favorite", { type: "error" });
    }
  };

  return (
    <div className="border-1 border-solid bg-white border-gray-300 shadow-md rounded-md p-6">
      <h2 className="text-3xl font-bold text-gray-900">Favorites</h2>
      <ToastContainer />
      {loading ? (
        <ClipLoader color="#000" size={35} />
      ) : favorites.length === 0 ? (
        <p className="text-gray-700 text-lg">No favorites found.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {favorites
          .filter(
             (favorite) => favorite.userId === localUserId
  
          )
          .map((favorite) => (
            <li
              key={favorite.id}
              className="flex items-center justify-between border-b border-gray-300 py-2"
            >
              <div>
                <p className="text-sm font-semibold">{favorite.name}</p>
              </div>
              <button
                className="text-red-600 text-xs"
                onClick={() => handleDeleteFavorite(favorite.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesSection;
