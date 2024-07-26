"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomInput from "@/components/myInput.components";
import {
  getArticleById,
  updateArticle,
} from "@/services/nutrilab.article.service";
import {
  getIngredients,
  updateIngredient,
} from "@/services/nutrilab.ingredient.service";
import { Ingredient, IngredientDto } from "@/interfaces/ingredient.interface";

import areaOptionsSelect from "@/constantes/area-select";
import CustomSelect from "@/components/customSelect.components";

interface IUpdateArticleForm {
  name: string;
  description: string;
  area: string;
  preparation: string;
  ingredients: {
    id?: string;
    name: string;
    picture: string;
    labelDosage: string;
    dosage: string;
  }[];
}

const UpdateArticle: React.FC<{ params: { articleId: string } }> = ({
  params,
}) => {
  const { articleId } = params;

  const methods = useForm<IUpdateArticleForm>({
    defaultValues: {
      name: "",
      description: "",
      area: "",
      preparation: "",
      ingredients: [{ name: "", picture: "", labelDosage: "", dosage: "" }],
    },
  });

  const { control, handleSubmit, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  // Fetch article and ingredients
  const fetchArticleData = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedArticle = await getArticleById(articleId);
      const fetchedIngredients = await getIngredients(articleId);

      // Populate form with fetched data
      reset({
        name: fetchedArticle.name,
        description: fetchedArticle.description,
        area: fetchedArticle.area,
        preparation: fetchedArticle.preparation,
        ingredients: fetchedIngredients.map((ingredient) => ({
          id: ingredient.id,
          name: ingredient.name,
          picture: ingredient.picture,
          labelDosage: ingredient.labelDosage,
          dosage: ingredient.dosage,
        })),
      });
    } catch (error) {
      console.error("Failed to fetch article data:", error);
      setError("Failed to fetch article data.");
    } finally {
      setLoading(false);
    }
  }, [articleId, reset]);

  // Handle article form submission
  const onSubmitArticleForm: SubmitHandler<IUpdateArticleForm> = async (
    data
  ) => {
    setLoading(true);
    setError(null);
    try {
      await updateArticle(articleId, {
        name: data.name,
        description: data.description,
        area: data.area,
        preparation: data.preparation,
      });
      setStep(2);
    } catch (error) {
      setError("An error occurred while updating the article.");
    } finally {
      setLoading(false);
    }
  };

  // Handle ingredient form submission
  const onSubmitIngredientForm: SubmitHandler<IUpdateArticleForm> = async (
    data
  ) => {
    setLoading(true);
    setError(null);
    try {
      // Update each ingredient
      for (const ingredient of data.ingredients) {
        if (ingredient.id) {
          await updateIngredient(
            articleId,
            ingredient.id,
            ingredient as IngredientDto
          );
        }
      }
      setTimeout(() => {
        toast("Article and ingredients updated successfully.", {
          type: "success",
        });
        window.location.href = "/marketplace";
        reset();
      }, 2000);
    } catch (error) {
      setError("An error occurred while updating the ingredients.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch article data on component mount
  useEffect(() => {
    fetchArticleData();
  }, [fetchArticleData]);

  return (
    <div className="h-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="bg-white m-auto w-full max-w-lg shadow-lg rounded-md p-6">
        <h2 className="my-3 text-center text-2xl font-bold tracking-tight text-gray-900">
          Update Article
        </h2>
        <FormProvider {...methods}>
          {step === 1 && (
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmitArticleForm)}
            >
              <CustomInput
                label="Name"
                type="text"
                name="name"
                required={true}
                register={methods.register}
              />
              <CustomInput
                label="Description"
                type="text"
                name="description"
                required={true}
                register={methods.register}
              />
              <CustomSelect
                label="Area"
                name="area"
                required={true}
                register={methods.register}
                options={areaOptionsSelect}
              />
              <CustomInput
                label="Preparation"
                type="textarea"
                name="preparation"
                required={true}
                register={methods.register}
              />
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? <ClipLoader color="#fff" size={20} /> : "Next"}
              </button>
            </form>
          )}
          {step === 2 && (
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmitIngredientForm)}
            >
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col space-y-4">
                  <CustomInput
                    label="Name"
                    type="text"
                    name={`ingredients.${index}.name`}
                    required={true}
                    register={methods.register}
                  />
                  <CustomInput
                    label="Picture"
                    type="text"
                    name={`ingredients.${index}.picture`}
                    required={true}
                    register={methods.register}
                  />
                  <CustomInput
                    label="Label Dosage"
                    type="text"
                    name={`ingredients.${index}.labelDosage`}
                    required={true}
                    register={methods.register}
                  />
                  <CustomInput
                    label="Dosage"
                    type="number"
                    name={`ingredients.${index}.dosage`}
                    required={true}
                    register={methods.register}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  append({ name: "", picture: "", labelDosage: "", dosage: "" })
                }
                className="text-blue-500"
              >
                Add Ingredient
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? <ClipLoader color="#fff" size={20} /> : "Update"}
              </button>
            </form>
          )}
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </FormProvider>
      </div>
    </div>
  );
};

export default UpdateArticle;
