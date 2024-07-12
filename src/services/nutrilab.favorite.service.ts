"use server";
import Favorite, { FavoriteDto } from "@/interfaces/favorite.interface";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export async function getFavorites(): Promise<Favorite[]> {
  const token = cookies().get("token")?.value || "";
  if (!token) {
    console.error("No token found in cookies");
    return [];
  }

  const response = await fetch(`${url}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data as Favorite[];
}

export async function findOneFavorite(id: string): Promise<Favorite> {
  const token = cookies().get("token")?.value || "";

  try {
    const response = await fetch(`${url}/favorites/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data as Favorite;
    } else {
      throw new Error("Response is not JSON");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch favorite:", error.message);
    } else {
      console.error("Failed to fetch favorite:", error);
    }
    return {} as Favorite;
  }
}

export async function addFavorite(
  articleId: string,
  favoriteDto: FavoriteDto
): Promise<void> {
  const token = cookies().get("token")?.value || "";

  if (!token) {
    throw new Error("No token found in cookies");
  }

  try {
    const response = await fetch(`${url}/favorites/${articleId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(favoriteDto),
    });

    if (!response.ok) {
      throw new Error(`Failed to add favorite: ${response.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to add favorite:", error.message);
      throw new Error(
        `An error occurred while adding favorite: ${error.message}`
      );
    } else {
      console.error("Unknown error occurred while adding favorite");
      throw new Error("An unknown error occurred while adding favorite.");
    }
  }
}
export async function deleteFavorite(favoriteId: string): Promise<void> {
  const token = cookies().get("token")?.value || "";

  if (!token) {
    throw new Error("No token found in cookies");
  }

  try {
    const response = await fetch(`${url}/favorites/${favoriteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete favorite: ${response.statusText}`);
    }

    // Optionnel: Gérer la réponse si nécessaire
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to delete favorite:", error.message);
      throw new Error(
        `An error occurred while deleting favorite: ${error.message}`
      );
    } else {
      console.error("Unknown error occurred while deleting favorite");
      throw new Error("An unknown error occurred while deleting favorite.");
    }
  }
}
