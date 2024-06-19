import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
  label: string;
  type: string;
  register: UseFormRegister<T>;
  required?: boolean;
  name: Path<T>;
}

function CustomInput<T extends FieldValues>({ label, type, register, required, name }: CustomInputProps<T>) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        {...register(name, { required })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        placeholder={label}
      />
    </div>
  );
}

export default CustomInput;
