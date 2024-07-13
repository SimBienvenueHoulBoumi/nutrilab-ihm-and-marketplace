"use client"

import React, { useEffect, useCallback, useState } from 'react';
import Article from '@/interfaces/article.interface';

import { getIngredients } from '@/services/nutrilab.ingredient.service';
import { Ingredient } from '@/interfaces/ingredient.interface';

interface ArticleDetailsProps {
    selectedArticle: Article;
    setSelectedArticle: React.Dispatch<React.SetStateAction<Article | null>>;
    closeModal: () => void;
    modalRef: React.RefObject<HTMLDivElement>;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ selectedArticle, setSelectedArticle, closeModal, modalRef }) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeModal();
        }
    }, [modalRef, closeModal]);

    useEffect(() => {
        if (selectedArticle) {
            document.addEventListener('mousedown', handleClickOutside);
            (async () => {
                const fetchedIngredients = await getIngredients(selectedArticle.id);
                setIngredients(fetchedIngredients);
            })();
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside, selectedArticle]);

    return (
        <div ref={modalRef} className="fixed top-0 left-0 z-50 flex items-start justify-start h-full p-6 bg-white shadow-lg max-w-sm w-full overflow-auto">
            <div className="relative w-full">
                <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mt-4">
                    {selectedArticle.name}
                </h2>
                <p className="mb-2"><strong>Description:</strong> {selectedArticle.description}</p>
                <p className="mb-2"><strong>Area:</strong> {selectedArticle.area}</p>
                <h2 className="text-2xl font-bold mt-4"><strong>Ingredients:</strong></h2>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="mb-2">
                        <p><strong>Ingredient:</strong> {ingredient.name}</p>
                        <p><strong>Quantity:</strong> {ingredient.dosage} {ingredient.labelDosage}</p>
                    </div>
                ))}
                <h2 className="text-2xl font-bold mt-4">Preparation</h2>
                <p className="mb-2">{selectedArticle.preparation}</p>
            </div>
        </div>
    );
}

export default ArticleDetails;
