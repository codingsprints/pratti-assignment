"use client";
import { loginSchema } from "@/schema/contentSchema";
import { LoginUser } from "@/services/authServices";
import { LoginTypes } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const callbackSuccess = () => {
    contentFormRest();
    router.push("/dashboard");
  };

  const callbackError = (message: string) => {
    toast.error(message);
  };

  const { mutate: loginMutate } = LoginUser(callbackSuccess, callbackError);

  type LoginFormInputs = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    reset: contentFormRest,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginTypes) => {
    // Handle registration logic here
    loginMutate(data);
    // try {
    //   const res = await signIn("credentials", {
    //     email: data?.email,
    //     password: data?.password,
    //     redirect: false,
    //   });

    //   if (res.error) {
    //     // setError("Invalid Credentials");
    //     return;
    //   }

    //   router.push("/dashboard");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            🍕
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInForm;
