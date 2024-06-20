import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface CustomSelectProps<T extends FieldValues> {
  label: string;
  options: { label: string; value: string }[];
  register: UseFormRegister<T>;
  required?: boolean;
  name: Path<T>;
}

function CustomSelect<T extends FieldValues>({ label, options, register, required, name }: CustomSelectProps<T>) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name, { required })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomSelect;
