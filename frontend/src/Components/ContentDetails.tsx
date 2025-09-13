"use client";

import { DeleteContent } from "@/services/contentServices";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ContentDetails = ({ content }: { content: any }) => {
  const router = useRouter();

  const deleteContentSuccess = () => {
    router.push("/dashboard");
  };

  const deleteContentError = (message: string) => {
    toast.error(message);
  };

  const { mutate: deleteContentMutate } = DeleteContent(
    deleteContentSuccess,
    deleteContentError
  );
  return (
    <div
      key={content._id}
      className="border rounded p-3 bg-white flex justify-between items-center"
    >
      <div>
        <p className="font-medium text-gray-800">
          {content.contentType} — {content.topic}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Keywords: {content.keywords || "N/A"} | Tone: {content.tone} |
          Language: {content.language}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Created: {new Date(content.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => router.push(`/content/${content?._id}`)}
        >
          Update
        </button>
        <button
          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => deleteContentMutate(content?._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContentDetails;
