"use server";

import { Ingredient, IngredientDto } from "../interfaces/ingredient.interface";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export async function getIngredients(articleId: string): Promise<Ingredient[]> {
  const token = cookies().get("token")?.value || "";
  if (!token) {
    console.error("No token found in cookies");
    return [];
  }

  try {
    const response = await fetch(`${url}/ingredients/${articleId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Data received is not in expected format");
    }

    return data as Ingredient[];
  } catch (error) {
    console.error("Failed to fetch ingredients:", error);
    return [];
  }
}

export async function createIngredient(
  ingredient: IngredientDto,
  articleId: string
): Promise<String> {
  const token = cookies().get("token")?.value || "";

  try {
    const response = await fetch(`${url}/ingredients/${articleId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ingredient),
    });

    if ((await response.status) !== 201) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    return await response.text();
  } catch (error: any) {
    console.error("Failed to create ingredient:", error);
    throw new Error(`Failed to create ingredient: ${error.message}`);
  }
}

export async function updateIngredient(
  articleId: string,
  ingredientId: string,
  ingredient: IngredientDto
): Promise<Ingredient> {
  const token = cookies().get("token")?.value || "";

  try {
    const response = await fetch(
      `${url}/ingredients/${articleId}/${ingredientId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ingredient),
      }
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    return data as Ingredient;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while updating the ingredient: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while updating the ingredient."
      );
    }
  }
}

export async function deleteIngredient(
  articleId: string,
  ingredientId: string
): Promise<void> {
  const token = cookies().get("token")?.value || "";

  try {
    const response = await fetch(
      `${url}/ingredients/${articleId}/${ingredientId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete ingredient: ${error.message}`);
  }
}
