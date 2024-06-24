"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

import CustomInput from '@/components/myInput.components';
import CustomSelect from '@/components/customSelect.components';
import { createArticle } from '@/services/nutrilab.article.service';
import { createIngredient } from '@/services/nutrilab.ingredient.service';
import { ICreateMealForm } from '@/interfaces/meal.interface';
import areaOptionsSelect from '@/constantes/area-select';

const CreateMeal: React.FC = () => {
  const { register, handleSubmit, control, reset } = useForm<ICreateMealForm>({
    defaultValues: {
      name: '',
      description: '',
      area: '',
      ingredients: [{ name: '', picture: '', labelDosage: '', dosage: '0' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articleId, setArticleId] = useState<string | null>(null);
  const [showIngredientForm, setShowIngredientForm] = useState(false);

  const createArticleOnSubmit: SubmitHandler<ICreateMealForm> = async (data, event) => {
    event?.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const article = await createArticle({
        name: data.name,
        description: data.description,
        area: data.area,
      });

      if (!article.id) {
        throw new Error('Article ID is undefined');
      }

      setArticleId(article.id);
      setShowIngredientForm(true);
      reset({
        name: '',
        description: '',
        area: '',
        ingredients: [{ name: '', picture: '', labelDosage: '', dosage: '0' }],
      });
    } catch (error) {
      console.error('Failed to create article:', error);
      setError('An error occurred while creating the article.');
    } finally {
      setLoading(false);
    }
  };

  const createIngredientsOnSubmit: SubmitHandler<ICreateMealForm> = async (data, event) => {
    event?.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!articleId) {
        throw new Error('Article ID is not available');
      }

      for (const ingredient of data.ingredients) {
        try {
          await createIngredient({
            name: ingredient.name,
            picture: ingredient.picture,
            labelDosage: ingredient.labelDosage,
            dosage: Number(ingredient.dosage),
          }, articleId);
        } catch (ingredientError) {
          throw new Error(`Failed to create ingredient ${ingredient.name}`);
        }
      }

      reset({
        name: '',
        description: '',
        area: '',
        ingredients: [{ name: '', picture: '', labelDosage: '', dosage: '0' }],
      });

      setArticleId(null);
      setShowIngredientForm(false);
      window.location.href = '/marketplace';
    } catch (error) {
      console.error('Failed to create ingredients:', error);
      setError('An error occurred while creating the ingredients.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full flex-grow space-y-4">
        <div className="bg-white m-auto my-4 w-4/12 shadow-lg rounded-md p-6 max-h-screen overflow-y-auto">
          {!showIngredientForm ? (
            <>
              <h2 className="my-3 text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Create a New Article
              </h2>
              <form className="flex flex-col space-y-4" method="POST" onSubmit={handleSubmit(createArticleOnSubmit)}>
                <CustomInput
                  label="Name"
                  type="text"
                  name="name"
                  required={true}
                  register={register}
                />
                <CustomInput
                  label="Description"
                  type="text"
                  name="description"
                  required={true}
                  register={register}
                />
                <CustomSelect
                  label="Area"
                  name="area"
                  options={areaOptionsSelect}
                  register={register}
                  required
                />
                {error && (
                  <div className="text-red-500 text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? <ClipLoader color="#fff" size={20} /> : 'Create Article'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="my-3 text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                Add Ingredients
              </h2>
              <form className="space-y-4" method="POST" onSubmit={handleSubmit(createIngredientsOnSubmit)}>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Ingredients</h3>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col space-y-2">
                    <CustomInput
                      label={`Ingredient ${index + 1} Name`}
                      type="text"
                      name={`ingredients.${index}.name`}
                      register={register}
                      required
                    />
                    <CustomInput
                      label={`Ingredient ${index + 1} Picture`}
                      type="text"
                      name={`ingredients.${index}.picture`}
                      register={register}
                      required
                    />
                    <CustomInput
                      label={`Ingredient ${index + 1} Label Dosage`}
                      type="text"
                      name={`ingredients.${index}.labelDosage`}
                      register={register}
                      required
                    />
                    <CustomInput
                      label={`Ingredient ${index + 1} Dosage`}
                      type="number"
                      name={`ingredients.${index}.dosage`}
                      register={register}
                      required
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white px-2 py-1 my-1 rounded self-start"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-green-500 text-white px-2 py-1 rounded self-start"
                  onClick={() => append({ name: '', picture: '', labelDosage: '', dosage: '0' })}
                >
                  Add Ingredient
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? <ClipLoader color="#fff" size={20} /> : 'Submit Ingredients'}
                </button>
                {error && (
                  <div className="text-red-500 text-sm">
                    {error}
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMeal;
