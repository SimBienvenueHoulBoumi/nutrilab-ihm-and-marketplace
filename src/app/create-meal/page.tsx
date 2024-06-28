"use client";

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider, useFieldArray } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

import StepIndicator from '@/components/StepIndicator.components';
import ArticleForm from '@/components/ArticleForm.components';
import ConfirmationMessage from '@/components/ConfirmationMessage.component';
import IngredientForm from '@/components/IngredientsForm.component';

import { ICreateMealForm } from '@/interfaces/meal.interface';
import { createArticle } from '@/services/nutrilab.article.service';
import { createIngredient } from '@/services/nutrilab.ingredient.service';
import { IngredientDto } from '@/interfaces/ingredient.interface';

interface ArticleResponse {
  id: string;
  name: string;
  description: string;
  area: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const CreateMeal: React.FC = () => {
  const methods = useForm<ICreateMealForm>({
    defaultValues: {
      name: '',
      description: '',
      area: '',
      ingredients: [{ name: '', picture: '', labelDosage: '', dosage: '' }],
    },
  });

  const { control, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const [articleData, setArticleData] = useState<ICreateMealForm | null>(null);
  const [ingredientsData, setIngredientsData] = useState<IngredientDto[]>([]);

  const onSubmitArticleForm: SubmitHandler<ICreateMealForm> = async (data) => {
    setArticleData(data);
    setStep(2);
  };

  const onSubmitIngredientForm: SubmitHandler<ICreateMealForm> = async (data) => {
    setIngredientsData(data.ingredients);
    setStep(3);
  };

  const restartProcess = () => {
    reset({
      name: '',
      description: '',
      area: '',
      ingredients: [{ name: '', picture: '', labelDosage: '', dosage: '' }],
    });
    setStep(1);
    setConfirmed(false);
    setArticleData(null);
    setIngredientsData([]);
  };

  const handleAddIngredient = () => {
    append({
      name: '',
      picture: '',
      labelDosage: '',
      dosage: '',
    });
  };

  const handleRemoveIngredient = (index: number) => {
    remove(index);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const articleResponse: ArticleResponse = await createArticle({
        name: articleData!.name,
        description: articleData!.description,
        area: articleData!.area,
      });
      const articleId = articleResponse.id;

      await new Promise((resolve) => setTimeout(resolve, 5000));

      await Promise.all(
        ingredientsData.map(async (ingredient) => {
          try {
            await createIngredient(
              {
                name: ingredient.name,
                picture: ingredient.picture,
                labelDosage: ingredient.labelDosage,
                dosage: ingredient.dosage,
              },
              articleId
            );
          } catch (error) {
            throw new Error(`Failed to create ingredient ${ingredient.name}`);
          }
        })
      );
      setConfirmed(true);
      setStep(3);
    } catch (error) {
      setError('An error occurred while creating the article or ingredients.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4 py-auto lg:px-4">
      <div className="bg-white m-auto sm:w-7/12 w-screen shadow-lg rounded-md p-3">
        <StepIndicator step={step} confirmed={confirmed} />
        <div className="w-full justify-center flex-grow space-y-4">
          <FormProvider {...methods}>
            {step === 1 && <ArticleForm onSubmit={onSubmitArticleForm} />}
            {step === 2 && (
              <IngredientForm
                onSubmit={onSubmitIngredientForm}
                onAddIngredient={handleAddIngredient}
                onRemoveIngredient={handleRemoveIngredient}
                fields={fields}
              />
            )}
            {step === 3 && (
              <ConfirmationMessage
                onRestart={restartProcess}
                onConfirm={handleConfirm}
                articleData={articleData}
                ingredientsData={ingredientsData}
              />
            )}
          </FormProvider>
          {loading && (
            <div className="flex justify-center p-4">
              <ClipLoader color="#3B82F6" size={35} />
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMeal;
