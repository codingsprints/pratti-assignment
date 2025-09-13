import axiosInstance from "@/utils/axios";
import { backendUrl } from "@/utils/config";
import { Credentials, LoginTypes } from "@/utils/types";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const RegisterUser = (
  callbackSuccess: () => void,
  callbackError: (message: string) => void
) => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (details: Credentials) => {
      const { data } = await axiosInstance.post(
        `${backendUrl}/auth/register`,
        details
      );
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data?.message);
      callbackSuccess();
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      console.log("Data:", err.response?.data?.error?.message);
      if (err.response?.data?.error?.message) {
        callbackError(err?.response?.data?.error?.message);
      } else if (err.response?.data?.errors[0]?.msg) {
        callbackError(err.response?.data?.errors[0]?.msg);
      } else {
        callbackError(err?.message);
      }
    },
  });
};

export const LoginUser = (
  callbackLoginSuccess: () => void,
  callbackLoginError: (message: string) => void
) => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (details: LoginTypes) => {
      const { data } = await axiosInstance.post(
        `${backendUrl}/auth/login`,
        details
      );
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data?.message);
      callbackLoginSuccess();
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      console.log("Data:", err?.response?.data?.error?.message);
      if (err.response?.data?.error?.message) {
        callbackLoginError(err?.response?.data?.error?.message);
      } else if (err.response?.data?.errors[0]?.msg) {
        callbackLoginError(err.response?.data?.errors[0]?.msg);
      } else {
        callbackLoginError(err?.message);
      }
    },
  });
};

export const RefreshToken = (
  callbackRefreshSuccess: () => void,
  callbackRefreshError: (message: string) => void
) => {
  return useMutation({
    mutationKey: ["refreshtoken"],
    mutationFn: async (details: Credentials) => {
      const { data } = await axiosInstance.post(
        `${backendUrl}/auth/refresh`,
        details
      );
      return data;
    },
    onSuccess: async () => {
      callbackRefreshSuccess();
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      console.log("Data:", err?.response?.data?.error?.message);
      if (err.response?.data?.error?.message) {
        callbackRefreshError(err?.response?.data?.error?.message);
      } else if (err.response?.data?.errors[0]?.msg) {
        callbackRefreshError(err.response?.data?.errors[0]?.msg);
      } else {
        callbackRefreshError(err?.message);
      }
    },
  });
};

export const LogoutUser = (
  callbackLogoutSuccess: () => void,
  callbackLogoutError: (message: string) => void
) => {
  return useMutation({
    mutationKey: ["logoutuser"],
    mutationFn: async () => {
      const { data } = await axiosInstance.post(`${backendUrl}/auth/logout`);
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data?.message);
      callbackLogoutSuccess();
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      if (err.response?.data?.error?.message) {
        callbackLogoutError(err?.response?.data?.error?.message);
      } else if (err.response?.data?.errors[0]?.msg) {
        callbackLogoutError(err.response?.data?.errors[0]?.msg);
      } else {
        callbackLogoutError(err?.message);
      }
    },
  });
};

export const SelfUser = () => {
  return useQuery({
    queryKey: ["selfuser"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/auth/self");
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
