"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

import CustomInput from "@/components/myInput.components";
import { registerUser } from "@/services/auth.service";
import { IRegisterFormValues } from "@/interfaces/myInput.interfaces";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<IRegisterFormValues>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IRegisterFormValues> = async (data, event) => {
    event?.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (data.password !== data.password2) {
        toast("Passwords do not match", {
          type: "error",
        });
        return;
      }
      const response = await registerUser(
        data.email,
        data.password,
        data.firstname,
        data.lastname
      );
      if (response) {
        setTimeout(() => {
          toast("user successfully logged in. Redirecting...", {
            type: "success",
          });
          window.location.href = "/login";
        }, 2000);
      } else {
        toast("Couldn't register user. Please try again.", {
          type: "error",
        });
      }
    } catch (error) {
      toast("An error occurred during registration.", {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="bg-white m-auto w-full max-w-md shadow-lg rounded-md p-6 sm:p-8">
        <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
          Signin an account
        </h2>

        <form
          className="space-y-3"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            label="Email"
            type="email"
            name="email"
            required
            register={register}
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            required
            register={register}
          />

          <CustomInput
            label="Confirm Password"
            type="password"
            name="password2"
            required
            register={register}
          />
          <CustomInput
            label="First Name"
            type="text"
            name="firstname"
            required
            register={register}
          />
          <CustomInput
            label="Last Name"
            type="text"
            name="lastname"
            required
            register={register}
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Register"}
          </button>
          <div className="text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/login">
              <div className="hover:underline hover:text-[#20847D]">Login</div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
