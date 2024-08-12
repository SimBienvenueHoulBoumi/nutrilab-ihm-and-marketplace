"use client";

import React from "react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface CustomInputProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  minHeight?: string;
  maxHeight?: string;
  required?: boolean;
  validationRules?: RegisterOptions<T, Path<T>>;
  register: UseFormRegister<T>;
}

function CustomInput<T extends FieldValues>({
  label,
  type,
  register,
  required,
  name,
  minHeight = "150px",
  maxHeight = "400px",
  validationRules,
}: CustomInputProps<T>) {
  const validationOptions: RegisterOptions<T, Path<T>> = {
    required: required ? true : undefined,
    ...validationRules,
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          {...register(name, validationOptions)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={name}
          placeholder={label}
          style={{ minHeight, maxHeight }}
        />
      ) : (
        <input
          type={type}
          {...register(name, validationOptions)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={name}
          placeholder={label}
        />
      )}
    </div>
  );
}

export default CustomInput;
