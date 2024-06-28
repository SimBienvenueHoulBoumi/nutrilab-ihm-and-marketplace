"use client"

import React from 'react';
import { ICreateMealForm } from '@/interfaces/meal.interface';
import { IngredientDto } from '@/interfaces/ingredient.interface';

interface ConfirmationMessageProps {
  onRestart: () => void;
  onConfirm: () => Promise<void>; // Assurez-vous que le type de retour est bien une Promise<void>
  articleData: ICreateMealForm | null;
  ingredientsData: IngredientDto[];
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({ onRestart, onConfirm, articleData, ingredientsData }) => {
  const convertToIngredients = (ingredientsDto: IngredientDto[]) => {
    return ingredientsDto.map((ingredientDto) => ({
      ...ingredientDto,
      id: '',
      createdAt: '',
      updatedAt: '',
    }));
  };

  const ingredients = convertToIngredients(ingredientsData);

  return (
    <div className="p-4">
      <div className="text-center">
        <p className="text-lg font-semibold mb-4">Article Created Successfully!</p>
        {articleData && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Article Details:</h2>
            <p><strong>Name:</strong> {articleData.name}</p>
            <p><strong>Description:</strong> {articleData.description}</p>
            <p><strong>Area:</strong> {articleData.area}</p>
          </div>
        )}
        {ingredients.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Ingredients:</h2>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="mb-2">
                <p><strong>Name:</strong> {ingredient.name}</p>
                <p><strong>Picture:</strong> {ingredient.picture}</p>
                <p><strong>Label Dosage:</strong> {ingredient.labelDosage}</p>
                <p><strong>Dosage:</strong> {ingredient.dosage}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onRestart}
            className="bg-red-300 hover:bg-teal-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
