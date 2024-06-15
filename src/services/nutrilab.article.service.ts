"use server"

import Article, { ArticleDto } from '@/interfaces/article.interface';
import { cookies } from 'next/headers';

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

const getArticles = async (): Promise<Article[]> => {
    const token = cookies().get('token')?.value || "";

    try {
        const response = await fetch(`${url}/articles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
            return data as Article[];
        } else {
            throw new Error('Data received is not in expected format');
        }
    } catch (error) {
        console.error('Failed to fetch articles:', error);
        return [];
    }
}

const createArticle = async (article: ArticleDto): Promise<Article> => {
    const token = cookies().get('token')?.value || "";

    try {
        const response = await fetch(`${url}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(article)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data as Article;
    } catch (error) {
        console.error('Failed to create article:', error);
        return {} as Article;
    }
}

const deleteArticle = async (id: string): Promise<void> => {
    const token = cookies().get('token')?.value || "";

    try {
        const response = await fetch(`${url}/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Failed to delete article:', error);
    }
}

const updateArticle = async (id: string, article: ArticleDto): Promise<Article> => {
    const token = cookies().get('token')?.value || "";

    try {
        const response = await fetch(`${url}/articles/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(article)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data as Article;
    } catch (error) {
        console.error('Failed to update article:', error);
        return {} as Article;
    }
}

export { getArticles, createArticle, deleteArticle, updateArticle };
