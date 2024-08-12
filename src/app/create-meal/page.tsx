"use client";

import React, { useState } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StepIndicator from "@/components/StepIndicator.components";
import ArticleForm from "@/components/ArticleForm.components";
import ConfirmationMessage from "@/components/ConfirmationMessage.component";
import IngredientForm from "@/components/IngredientsForm.component";
import { ICreateMealForm } from "@/interfaces/meal.interface";
import { createArticle, getArticles } from "@/services/nutrilab.article.service";
import { createIngredient } from "@/services/nutrilab.ingredient.service";

const CreateMeal: React.FC = () => {
  const methods = useForm<ICreateMealForm>({
    defaultValues: {
      name: "",
      description: "",
      area: "",
      preparation: "",
      ingredients: [{ name: "", picture: "", labelDosage: "", dosage: "" }],
    },
  });

  const { control, reset, getValues, setValue } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [articleData, setArticleData] = useState<ICreateMealForm>({
    name: '',
    description: '',
    area: '',
    preparation: '',
    ingredients: [],
  });

  const onSubmitArticleForm: SubmitHandler<ICreateMealForm> = (data) => {
    setArticleData({
      name: data.name || '',
      description: data.description || '',
      area: data.area || '',
      preparation: data.preparation || '',
      ingredients: data.ingredients || [],
    });
    setStep(2);
  };

  const onSubmitIngredientForm: SubmitHandler<ICreateMealForm> = (data) => {
    setArticleData({
      ...articleData,
      ingredients: data.ingredients || [],
    });
    setStep(3);
  };

  const handleAddIngredient = () => {
    append({ name: "", picture: "", labelDosage: "", dosage: "" });
  };

  const handleRemoveIngredient = (index: number) => {
    remove(index);
  };

  const handleBackToArticle = () => {
    setArticleData(getValues());
    setStep(1);
  };

  const restartProcess = () => {
    reset({
      name: "",
      description: "",
      area: "",
      preparation: "",
      ingredients: [{ name: "", picture: "", labelDosage: "", dosage: "" }],
    });
    setStep(1);
    setConfirmed(false);
    setArticleData({
      name: '',
      description: '',
      area: '',
      preparation: '',
      ingredients: [],
    });
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      await createArticle(articleData);

      const newArticle = (await getArticles()).find(
        (article) => article.name === articleData.name
      );

      if (!newArticle) {
        throw new Error("Article not found");
      }

      const articleId = newArticle.id;

      await Promise.all(
        articleData.ingredients.map(async (ingredient) => {
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

      toast.success("Article and ingredients created successfully");
      setConfirmed(true);
      setTimeout(() => {
        window.location.href = "/marketplace";
      }, 2000);
    } catch (error) {
      toast.error("An error occurred while creating the article or ingredients.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full min-h-24 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="bg-white m-auto sm:w-7/12 w-screen shadow-lg rounded-md p-3">
        <StepIndicator step={step} confirmed={confirmed} />
        <div className="w-full justify-center flex-grow space-y-4">
          <FormProvider {...methods}>
            {step === 1 && <ArticleForm onSubmit={onSubmitArticleForm} />}
            {step === 2 && (
              <>
                <IngredientForm
                  onSubmit={onSubmitIngredientForm}
                  onAddIngredient={handleAddIngredient}
                  onRemoveIngredient={handleRemoveIngredient}
                  fields={fields}
                />
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 mt-4"
                  onClick={handleBackToArticle}
                >
                  Back to Article
                </button>
              </>
            )}
            {step === 3 && (
              <ConfirmationMessage
                onRestart={restartProcess}
                onConfirm={handleConfirm}
                articleData={articleData}
                ingredientsData={articleData.ingredients || []}
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
