import React from 'react';
import InputProps from '@/interfaces/myInput.interfaces';

const CustomInput = ({ label, register, required, type }: InputProps) => (
    <label className="block text-sm font-medium text-gray-700">
        {label}
        <input
            {...register(label, { required })}
            type={type}
            autoComplete={label}
            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
        />
    </label>
);

export default CustomInput;