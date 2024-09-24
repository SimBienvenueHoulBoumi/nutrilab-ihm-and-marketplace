"use client";

import React from "react";
import {
  useFormContext,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import { ICreateMealForm } from "../interfaces/meal.interface";
import { FieldArrayWithId } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomInput from "../components/myInput.components";

interface IngredientFormProps {
  onSubmit: SubmitHandler<ICreateMealForm>;
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
  fields: FieldArrayWithId<ICreateMealForm, "ingredients", "id">[];
}

const IngredientForm: React.FC<IngredientFormProps> = ({
  onSubmit,
  onAddIngredient,
  onRemoveIngredient,
  fields,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid }, // Access form validation state
  } = useFormContext<ICreateMealForm>();

  const onSubmitForm: SubmitHandler<ICreateMealForm> = (data) => {
    onSubmit(data);
  };

  const handleError = () => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm, handleError)}>
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border-b border-gray-200">
            <CustomInput
              label={`Ingredient Name ${index + 1}`}
              type="text"
              name={`ingredients.${index}.name`}
              register={register as UseFormRegister<ICreateMealForm>}
              required
            />
            <CustomInput
              label={`Ingredient Picture ${index + 1}`}
              type="text"
              name={`ingredients.${index}.picture`}
              register={register as UseFormRegister<ICreateMealForm>}
              required
            />
            <CustomInput
              label="Label Dosage"
              type="text"
              name={`ingredients.${index}.labelDosage`}
              register={register as UseFormRegister<ICreateMealForm>}
              required
            />
            <CustomInput
              label="Dosage"
              type="number"
              name={`ingredients.${index}.dosage`}
              register={register as UseFormRegister<ICreateMealForm>}
              required
              validationRules={{
                min: {
                  value: 0.001,
                  message: "Dosage must be greater than 0",
                },
              }}
            />
            <button
              type="button"
              className={`text-white py-1 px-2 rounded focus:outline-none focus:ring-2 ${
                fields.length <= 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 focus:ring-red-600"
              }`}
              onClick={() => fields.length > 1 && onRemoveIngredient(index)}
              disabled={fields.length <= 1} // Disable button if there is only one ingredient
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50 mt-4"
          onClick={onAddIngredient}
        >
          Add Ingredient
        </button>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className={`bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50 ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isValid} // Disable the button if the form is invalid
          >
            Next
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default IngredientForm;
