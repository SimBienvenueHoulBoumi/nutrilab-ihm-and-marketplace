"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { ClipLoader } from 'react-spinners';

import CustomInput from '@/components/myInput.components';
import { IFormValues } from '@/types/formValues.types';
import { VerifyUser } from '@/services/auth.service';

function Login() {
  const { register, handleSubmit } = useForm<IFormValues>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormValues> = async (data, event) => {
    event?.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const isValid = await VerifyUser(data.email, data.password);
      if (isValid) {
        window.location.href = '/marketplace';
      } else {
        setLoading(false);
        setError('Invalid email or password.');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white m-auto w-full max-w-md shadow-lg rounded-md p-6 sm:p-8">
        <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
          Access to your account
        </h2>
        <form className="space-y-3" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Email"
            type="email"
            name="email"
            required={true}
            register={register}
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            required={true}
            register={register}
          />
          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : 'Login'}
          </button>
          <div className="text-center text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/register">
              <div className='hover:underline hover:text-[#20847D]'>Register</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
