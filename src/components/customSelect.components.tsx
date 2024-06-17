import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Option {
    name: string;
}

interface CustomSelectProps {
    label: string;
    options: Option[];
    register: UseFormRegisterReturn;
    required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, register, required }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <select
            {...register}
            required={required}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
            <option value="">Select an option</option>
            {options.map((option, index) => (
                <option key={index} value={option.name}>
                    {option.name}
                </option>
            ))}
        </select>
    </div>
);

export default CustomSelect;
