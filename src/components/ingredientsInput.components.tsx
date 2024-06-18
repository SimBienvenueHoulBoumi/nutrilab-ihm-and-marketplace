import React from 'react';
import { useForm, FieldArrayWithId } from 'react-hook-form';

import CustomInput from './myInput.components';
import { ICreateMealForm } from '../interfaces/meal.interface';

const IngredientInput: React.FC<{
    field: FieldArrayWithId<ICreateMealForm, "ingredients", "id">;
    index: number;
    register: ReturnType<typeof useForm<ICreateMealForm>['register']>;
    remove: (index: number) => void;
}> = ({ field, index, register, remove }) => {
    const customInputs = [
        { label: `Ingredient ${index + 1} Name`, name: `ingredients.${index}.name` },
        { label: `Ingredient ${index + 1} Picture`, name: `ingredients.${index}.picture` },
        { label: `Ingredient ${index + 1} Label Dosage`, name: `ingredients.${index}.labelDosage` },
        { label: `Ingredient ${index + 1} Dosage`, name: `ingredients.${index}.dosage` },
    ];

    return (
        <div key={field.id} className="flex flex-col space-y-2 mb-2">
            {customInputs.map((input, idx) => (
                <CustomInput
                    key={idx}
                    label={input.label}
                    type="text"
                    register={register(input.name)}
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
