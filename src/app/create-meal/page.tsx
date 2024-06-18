"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

import CustomInput from '@/components/myInput.components';
import CustomSelect from '@/components/customSelect.components';
import { createArticle } from '@/services/nutrilab.article.service';

import { createIngredient } from '@/services/nutrilab.ingredient.service';
import { ICreateMealForm } from '@/interfaces/meal.interface';
import areaOptions from '@/constantes/area';

const CreateMeal: React.FC = () => {
    const { register, handleSubmit, control, reset } = useForm<ICreateMealForm>({
        defaultValues: {
            name: '',
            description: '',
            area: '',
            ingredients: [{ name: '', picture: '', labelDosage: '', dosage: '' }],
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

    const createArticleOnSubmit: SubmitHandler<ICreateMealForm> = async (data) => {
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
                ingredients: [{ name: '', picture: '', labelDosage: '', dosage: '' }],
            });
            setError(null);
        } catch (error) {
            console.error('Failed to create article:', error);
            setError('An error occurred while creating the article.');
        } finally {
            setLoading(false);
        }
    };

    const createIngredientsOnSubmit: SubmitHandler<ICreateMealForm> = async (data) => {
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
                        dosage: ingredient.dosage,
                    }, articleId);
                } catch (ingredientError) {
                    throw new Error(`Failed to create ingredient ${ingredient.name}`);
                }
            }

            reset({
                name: '',
                description: '',
                area: '',
                ingredients: [{ name: '', picture: '', labelDosage: '', dosage: '' }],
            });

            setArticleId(null);
            setShowIngredientForm(false);
            setError(null);
            window.location.href = '/marketplace';
        } catch (error) {
            setError('An error occurred while creating the ingredients.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#9bee75] to-[#DFAF2C]">
            <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg space-y-8">
                    <div className="bg-white shadow-lg rounded-md p-6">
                        {!showIngredientForm ? (
                            <>
                                <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                                    Create a New Article
                                </h2>
                                <form className="space-y-3" onSubmit={handleSubmit(createArticleOnSubmit)}>
                                    <CustomInput
                                        label="Name"
                                        type="text"
                                        register={register("name")}
                                        required
                                    />
                                    <CustomInput
                                        label="Description"
                                        type="text"
                                        register={register("description")}
                                        required
                                    />
                                    <CustomSelect
                                        label="Area"
                                        options={areaOptions}
                                        register={register("area")}
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
                                <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                                    Add Ingredients
                                </h2>
                                <form className="space-y-3" onSubmit={handleSubmit(createIngredientsOnSubmit)}>
                                    <h3 className="text-xl font-bold text-gray-900">Ingredients</h3>
                                    <div className="max-h-64 overflow-y-auto space-y-2 mb-2">
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="flex flex-col space-y-2 mb-2">
                                                <CustomInput
                                                    label={`Ingredient ${index + 1} Name`}
                                                    type="text"
                                                    register={register(`ingredients.${index}.name`)}
                                                    required
                                                />
                                                <CustomInput
                                                    label={`Ingredient ${index + 1} Picture`}
                                                    type="text"
                                                    register={register(`ingredients.${index}.picture`)}
                                                    required
                                                />
                                                <CustomInput
                                                    label={`Ingredient ${index + 1} Label Dosage`}
                                                    type="text"
                                                    register={register(`ingredients.${index}.labelDosage`)}
                                                    required
                                                />
                                                <CustomInput
                                                    label={`Ingredient ${index + 1} Dosage`}
                                                    type="number"
                                                    register={register(`ingredients.${index}.dosage`)}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                                    onClick={() => remove(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                        onClick={() => append({ name: "", picture: "", labelDosage: "", dosage: "" })}
                                    >
                                        Add Ingredient
                                    </button>

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
                                        {loading ? <ClipLoader color="#fff" size={20} /> : 'Create Ingredients'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMeal;
