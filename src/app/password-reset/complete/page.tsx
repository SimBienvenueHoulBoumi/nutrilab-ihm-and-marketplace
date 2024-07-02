"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/auth.service";
import CustomInput from "@/components/myInput.components";
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type IFormValues = {
  password: string;
  confirmPassword: string;
  [key: string]: string | number;
};

export default function ResetPassword() {
  const { register, handleSubmit } = useForm<IFormValues>();
  const router = useRouter();

  const onSubmit = async (data: IFormValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    const success = await resetPassword({ password: data.password});

    if (success) {
      setTimeout(() => {
        toast.success("Password reset successfully");
        router.push("/login");
      }, 2000);
    } else {
      toast.error("An error occurred during password reset");
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="bg-white m-auto w-full max-w-md shadow-lg rounded-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center">
          Complete password reset
        </h1>
        <form
          method="POST"
          className="space-y-3 p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            label="New password"
            type="password"
            name="password"
            required={true}
            register={register}
          />
          <CustomInput
            label="Confirm new password"
            type="password"
            name="confirmPassword"
            required={true}
            register={register}
          />
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
