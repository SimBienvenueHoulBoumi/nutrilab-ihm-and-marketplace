import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CustomInputProps {
    label: string;
    type: string;
    register: UseFormRegisterReturn;
    required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, type, register, required }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            {...register}
            required={required}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
    </div>
);

export default CustomInput;
