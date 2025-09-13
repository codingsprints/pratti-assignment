import axiosInstance from "@/utils/axios";
import { FormDataType } from "@/utils/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const FetchContents = () => {
  return useQuery({
    queryKey: ["fetchcontents"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/contents");
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const SingleFetchContent = (id: string) => {
  return useQuery({
    queryKey: ["singlefetchcontent", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/contents/${id}`);
      return data;
    },
    placeholderData: keepPreviousData,
  });
};

export const CreateContent = (
  createContentSuccess: () => void,
  createContentError: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createcontent"],
    mutationFn: async (details: FormDataType) => {
      const { data } = await axiosInstance.post(`/contents`, details);
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data?.message);
      createContentSuccess();
      queryClient.invalidateQueries({
        queryKey: ["fetchcontents"],
      });
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      console.log("Data:", err?.response?.data?.error?.message);
      if (err.response?.data?.error?.message) {
        createContentError(err?.response?.data?.error?.message);
      } else if (err.response?.data?.errors[0]?.msg) {
        createContentError(err.response?.data?.errors[0]?.msg);
      } else {
        createContentError(err?.message);
      }
    },
  });
};

export const UpdateContent = (
  id: string,
  createContentSuccess: () => void,
  createContentError: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updatecontent"],
    mutationFn: async (details: FormDataType) => {
      const { data } = await axiosInstance.put(`/contents/${id}`, details);
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["fetchcontents"],
      });
      createContentSuccess();
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      console.log("Data:", err?.response?.data?.error?.message);
      if (err.response?.data?.error?.message) {
        createContentError(err?.response?.data?.error?.message);
      } else if (err.response?.data?.errors[0]?.msg) {
        createContentError(err.response?.data?.errors[0]?.msg);
      } else {
        createContentError(err?.message);
      }
    },
  });
};

export const DeleteContent = (
  deleteContentSuccess: () => void,
  deleteContentError: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletecontent"],
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`/contents/${id}`);
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["fetchcontents"],
      });
      deleteContentSuccess();
    },
    onError(error) {
      const err = error as AxiosError<any>; // cast error to AxiosError

      console.log("Data:", err?.response?.data?.error?.message);
      if (err.response?.data?.error?.message) {
        deleteContentError(err?.response?.data?.error?.message);
      } else if (err.response?.data?.errors[0]?.msg) {
        deleteContentError(err.response?.data?.errors[0]?.msg);
      } else {
        deleteContentError(err?.message);
      }
    },
  });
};
