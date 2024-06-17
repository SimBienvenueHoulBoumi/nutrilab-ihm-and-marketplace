"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { ICreateMealForm } from "@/interfaces/meal.interface"

import CustomInput from '@/components/myInput.components';
import CustomSelect from '@/components/customSelect.components';


const areaOptions = [
    { name: 'Africa' },
    { name: 'Asia' },
    { name: 'Europe' },
    { name: 'North America' },
    { name: 'South America' },
    { name: 'Australia' },
    { name: 'Antarctica' }
];

function CreateMeal() {
    const { register, handleSubmit, control } = useForm<ICreateMealForm>({
        defaultValues: {
            name: "",
            description: "",
            area: "",
            ingredients: [{ name: "", picture: "", labelDosage: "", dosage: "" }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients"
    });
    const [loading, setLoading] = useState(false);

    const createMealOnSubmit: SubmitHandler<ICreateMealForm> = async (data) => {
        setLoading(true);
        try {
            // Loguer les données entrées par l'utilisateur dans la console
            console.log("Données du formulaire:", data);
        } catch (error) {
            console.error("Error logging form data:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderIngredientInputs = (fields: any, register: any) => {
        const renderCustomInput = (label: string, type: string, register: any, name: string) => (
            <CustomInput
                key={name}
                label={label}
                type={type}
                register={register(name)}
                required
            />
        );

        return fields.map((field: any, index: number) => (
            <div key={field.id} className="flex flex-col space-y-2 mb-2">
                {renderCustomInput(`Ingredient ${index + 1} Name`, "text", register, `ingredients.${index}.name`)}
                {renderCustomInput(`Ingredient ${index + 1} Picture`, "text", register, `ingredients.${index}.picture`)}
                {renderCustomInput(`Ingredient ${index + 1} Label Dosage`, "text", register, `ingredients.${index}.labelDosage`)}
                {renderCustomInput(`Ingredient ${index + 1} Dosage`, "text", register, `ingredients.${index}.dosage`)}
                <button
                    type="button"
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => remove(index)}
                >
                    Remove
                </button>
            </div>
        ));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#9bee75] to-[#DFAF2C]">
            <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg space-y-8">
                    <div className="bg-white shadow-lg rounded-md p-6">
                        <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Create a New Meal
                        </h2>
                        <form className="space-y-3" onSubmit={handleSubmit(createMealOnSubmit)}>
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
                            <h3 className="text-xl font-bold text-gray-900">Ingredients</h3>
                            <div className="max-h-64 overflow-y-auto">
                                {renderIngredientInputs(fields, register)}
                            </div>
                            <button
                                type="button"
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => append({ name: "", picture: "", labelDosage: "", dosage: "" })}
                            >
                                Add Ingredient
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? <ClipLoader color="#fff" size={20} /> : 'Create Meal'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateMeal;
