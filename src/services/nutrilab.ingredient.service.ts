"use server"


import Ingredient, { IngredientDto } from "../interfaces/ingredient.interface"

import { cookies } from 'next/headers';

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

const getIngredients = async (articleId: string): Promise<Ingredient[]> => {
    const token = cookies().get('token')?.value || "";
    if (!token) {
        console.error('No token found in cookies');
        return [];
    }

    try {
        const response = await fetch(`${url}/ingredients/${articleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error('Data received is not in expected format');
        }

        return data as Ingredient[];
    } catch (error) {
        console.error('Failed to fetch ingredients:', error);
        return [];
    }
}

const createIngredient = async (ingredient: IngredientDto, articleId: string): Promise<Ingredient> => {
    const token = cookies().get('token')?.value || "";

    try {
        const response = await fetch(`${url}/ingredients/${articleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(ingredient)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data as Ingredient;
    } catch (error) {
        console.error('Error:', error);
        return {} as Ingredient;
    }
}

const updateIngredient = async (articleId: string, ingredientId: string): Promise<Ingredient> => {
    const token = cookies().get('token')?.value || "";

    try {
        const response = await fetch(`${url}/ingredients/${articleId}/${ingredientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data as Ingredient;
    } catch (error) {
        console.error('Error:', error);
        return {} as Ingredient;
    }
}

const deleteIngredient = async (articleId: string, ingredientId: string): Promise<void> => {
    const token = cookies().get('token')?.value || "";

    try {
        const response = await fetch(`${url}/ingredients/${articleId}/${ingredientId}`, {
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
        console.error('Error:', error);
    }
}


export { getIngredients, createIngredient, updateIngredient, deleteIngredient }