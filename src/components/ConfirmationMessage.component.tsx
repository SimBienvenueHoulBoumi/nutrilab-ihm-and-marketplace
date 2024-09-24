"use client";

import React, { useState } from "react";
import { ICreateMealForm } from "@/interfaces/meal.interface";
import { IngredientDto } from "@/interfaces/ingredient.interface";

interface ConfirmationMessageProps {
  onRestart: () => void;
  onConfirm: () => Promise<void>;
  articleData: ICreateMealForm | null;
  ingredientsData: IngredientDto[];
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({
  onRestart,
  onConfirm,
  articleData,
  ingredientsData,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const convertToIngredients = (ingredientsDto: IngredientDto[]) => {
    return ingredientsDto.map((ingredientDto) => ({
      ...ingredientDto,
      id: "",
      createdAt: "",
      updatedAt: "",
    }));
  };

  const ingredients = convertToIngredients(ingredientsData);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await onConfirm();
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="p-4">
      <div className="text-center">
        <p className="text-lg font-semibold mb-4">
          Let&apos;s recap our article!
        </p>
        {articleData && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Article Details:</h2>
            <p>
              <strong>Name:</strong> {articleData.name}
            </p>
            <p>
              <strong>Description:</strong> {articleData.description}
            </p>
            <p>
              <strong>Area:</strong> {articleData.area}
            </p>
            <p>
              <strong>Preparation:</strong> {articleData.preparation}
            </p>
          </div>
        )}
        {ingredients.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Ingredients:</h2>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="mb-2">
                <p>
                  <strong>Name:</strong> {ingredient.name}
                </p>
                <p>
                  <strong>Picture:</strong> {ingredient.picture}
                </p>
                <p>
                  <strong>Dosage:</strong> {ingredient.dosage}{" "}
                  {ingredient.labelDosage}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onRestart}
            disabled={isConfirming}
            className={`bg-red-300 hover:bg-red-400 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50 ${
              isConfirming ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            {isConfirming ? (
              <svg
                className="animate-spin h-5 w-5 text-white inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{ height: "1.25rem", width: "1.25rem" }}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
