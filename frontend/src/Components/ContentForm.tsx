"use client";
import { formSchema } from "@/schema/contentSchema";
import {
  CreateContent,
  SingleFetchContent,
  UpdateContent,
} from "@/services/contentServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export type FormData = z.infer<typeof formSchema>;

const ContentForm = ({ isEdit }: { isEdit: boolean }) => {
  const router = useRouter();
  const params = useParams();
  const contentID = params?.id || "";

  const createContentSuccess = () => {
    contentFormRest();
    router.push("/dashboard");
  };

  const createContentError = (message: string) => {
    toast.error(message);
  };

  const updateContentSuccess = () => {
    contentFormRest();
    router.push("/dashboard");
  };

  const updateContentError = (message: string) => {
    toast.error(message);
  };

  const { mutate: createContentMutate } = CreateContent(
    createContentSuccess,
    createContentError
  );

  const { data: contentData } = SingleFetchContent(String(contentID));

  const { mutate: updateContentMutate } = UpdateContent(
    String(contentID),
    updateContentSuccess,
    updateContentError
  );

  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    reset: contentFormRest,
    formState: { errors, isValid: contentFormIsValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    values: {
      contentType: contentData?.data?.contentDto?.contentType,
      keywords: contentData?.data?.contentDto?.keywords,
      language: contentData?.data?.contentDto?.language,
      tone: contentData?.data?.contentDto?.tone,
      topic: contentData?.data?.contentDto?.topic,
    },
    defaultValues: {
      tone: "Friendly",
      language: "English",
    },
  });

  const onSubmit = (data: FormData) => {
    // alert(JSON.stringify(data, null, 2));

    if (isEdit && contentID) {
      updateContentMutate(data);
    } else {
      createContentMutate(data);
    }
  };

  return (
    <main className="flex-1 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow border w-full max-w-lg space-y-6"
      >
        <h1 className="text-xl font-semibold text-center">
          Generate New Content
        </h1>

        {/* Content Goal */}
        <div>
          <h2 className="text-md font-semibold mb-3">Choose content goal:</h2>
          <div className="space-y-2">
            {[
              "Blog Post",
              "Instagram Caption",
              "Email Newsletter",
              "Product Description",
            ].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="radio"
                  value={type}
                  {...register("contentType")}
                  className="accent-gray-700"
                />
                {type}
              </label>
            ))}
          </div>
          {errors.contentType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contentType.message}
            </p>
          )}
        </div>

        {/* Input Prompt */}
        <div>
          <h2 className="text-md font-semibold mb-3">Input Prompt Details</h2>
          <input
            type="text"
            placeholder="Topic"
            {...register("topic")}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          {errors.topic && (
            <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>
          )}
          <input
            type="text"
            placeholder="Keywords (optional)"
            {...register("keywords")}
            className="w-full border rounded px-3 py-2 text-sm mt-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Tone */}
        <div>
          <h2 className="text-md font-semibold mb-3">Pick tone:</h2>
          <select
            {...register("tone")}
            className="w-1/2 border rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="Friendly">Friendly</option>
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <h2 className="text-md font-semibold mb-3">Choose language:</h2>
          <select
            {...register("language")}
            className="w-1/2 border rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
          </select>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!contentFormIsValid} // 👈 disable until all fields valid
            className={`px-6 py-2 rounded text-white ${
              contentFormIsValid
                ? "bg-gray-800 hover:bg-gray-900"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </form>
    </main>
  );
};

export default ContentForm;
