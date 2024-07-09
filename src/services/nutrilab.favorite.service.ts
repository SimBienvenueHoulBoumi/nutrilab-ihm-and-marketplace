"use server";
import Favorite, { FavoriteDto } from "@/interfaces/favorite.interface";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export async function getFavorites(articleId: String): Promise<Favorite[]> {
  const token = cookies().get("token")?.value || "";
  if (!token) {
    console.error("No token found in cookies");
    return [];
  }

  try {
    const response = await fetch(`${url}/favorites/${articleId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Data received is not in expected format");
      }
      return data as Favorite[];
    } else {
      throw new Error("Response is not JSON");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch favorites:", error.message);
    } else {
      console.error("Failed to fetch favorites:", error);
    }
    return [];
  }
}

export async function findOneFavorite(
  id: string,
  articleId: string
): Promise<Favorite> {
  const token = cookies().get("token")?.value || "";
  if (!token) {
    console.error("No token found in cookies");
    return {} as Favorite;
  }

  try {
    const response = await fetch(`${url}/favorites/${articleId}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

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
  articleId: String,
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

    if (response.status !== 200) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to add favorite:", error.message);
    } else {
      console.error("Failed to add favorite:", error);
    }
  }
}

export async function deleteFavorite(favoriteId: String): Promise<void> {
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

    if (response.status !== 200) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to delete favorite:", error.message);
    } else {
      console.error("Failed to delete favorite:", error);
    }
  }
}
