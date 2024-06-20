import React from 'react';
import { useForm, FieldArrayWithId, UseFormRegister, Path } from 'react-hook-form';

import CustomInput from './myInput.components';
import { ICreateMealForm } from '../interfaces/meal.interface';

interface IngredientInputProps {
    field: FieldArrayWithId<ICreateMealForm, "ingredients", "id">;
    index: number;
    register: UseFormRegister<ICreateMealForm>;
    remove: (index: number) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ field, index, register, remove }) => {
    const customInputs = [
        { label: `Ingredient ${index + 1} Name`, name: `ingredients.${index}.name` as Path<ICreateMealForm> },
        { label: `Ingredient ${index + 1} Picture`, name: `ingredients.${index}.picture` as Path<ICreateMealForm> },
        { label: `Ingredient ${index + 1} Label Dosage`, name: `ingredients.${index}.labelDosage` as Path<ICreateMealForm> },
        { label: `Ingredient ${index + 1} Dosage`, name: `ingredients.${index}.dosage` as Path<ICreateMealForm> },
    ];

    return (
        <div key={field.id} className="flex flex-col space-y-2 mb-2">
            {customInputs.map((input, idx) => (
                <CustomInput
                    key={idx}
                    label={input.label}
                    type="text"
                    name={input.name}
                    register={register}
                    required
                />
            ))}
            <button
                type="button"
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => remove(index)}
            >
                Remove
            </button>
        </div>
    );
};

export default IngredientInput;
