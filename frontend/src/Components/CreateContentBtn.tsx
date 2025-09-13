"use client";
import { useRouter } from "next/navigation";
import React from "react";

const CreateContentBtn = () => {
  const router = useRouter();
  return (
    <button
      className="w-full bg-gray-200 hover:bg-gray-300 py-8 rounded text-lg font-medium"
      onClick={() => router.push("/content")}
    >
      Generate New Content
    </button>
  );
};

export default CreateContentBtn;
