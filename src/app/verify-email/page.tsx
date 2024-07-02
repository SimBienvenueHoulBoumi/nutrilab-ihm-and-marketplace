"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "../../components/myInput.components";
import { sendPasswordResetEmail } from "../../services/auth.service";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type IFormValues = {
  email: string;
};

export default function VerifyEmail() {
  const { register, handleSubmit } = useForm<IFormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormValues> = async (data, event) => {
    event?.preventDefault();
    setLoading(true);

    try {
      const success = await sendPasswordResetEmail(data.email);
      
      if (success) {
        toast.success("Email sent successfully");
      } else {
        toast.error("Failed to send email. Please try again later.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="bg-white m-auto w-full max-w-md shadow-lg rounded-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center">
          Verify your email address
        </h1>
        <form
          method="POST"
          className="space-y-3 p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-center text-gray-500">
            We have sent you an email with a verification link. Please click on
            the link to verify your email address.
          </p>
          <CustomInput
            label="Email"
            type="email"
            name="email"
            required={true}
            register={register}
          />
          <button
            type="submit"
            disabled={loading}
            className={`flex w-full justify-center rounded-md border border-transparent bg-[#20847D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
}
