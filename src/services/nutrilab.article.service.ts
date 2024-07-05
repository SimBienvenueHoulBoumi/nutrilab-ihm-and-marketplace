"use server";

import Article, { ArticleDto } from "@/interfaces/article.interface";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export async function getArticles(): Promise<Article[]> {
  const token = cookies().get("token")?.value || "";
  if (!token) {
    console.error("No token found in cookies");
    return [];
  }

  try {
    const response = await fetch(`${url}/articles`, {
      method: "GET",
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
      return data as Article[];
    } else {
      throw new Error("Response is not JSON");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch articles:", error.message);
    } else {
      console.error("Failed to fetch articles:", error);
    }
    return [];
  }
}

export async function createArticle(article: ArticleDto): Promise<void> {
  try {
    const token = cookies().get("token")?.value || "";

    if (!token) {
      throw new Error("No token found in cookies");
    }

    const response = await fetch(`${url}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    });

    if ((await response.text()) != "article created") {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }
  } catch (error: any) {
    console.error("Failed to create article:", error);
    throw new Error(`Failed to create article: ${error.message}`);
  }
}


export async function deleteArticle(id: string): Promise<void> {
  const token = cookies().get("token")?.value || "";

  const response = await fetch(`${url}/articles/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Response error text:", errorText);
    throw new Error(`Network response was not ok: ${errorText}`);
  }
}

export async function updateArticle(
  id: string,
  article: ArticleDto
): Promise<string> {
  const token = cookies().get("token")?.value || "";

  try {
    const response = await fetch(`${url}/articles/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType) {
      return await response.text();
    } else {
      const text = await response.text();
      throw new Error(text);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `An error occurred while updating the article: ${error.message}`
      );
    } else {
      throw new Error("An unknown error occurred while updating the article.");
    }
  }
}
