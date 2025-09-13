"use client";
import React from "react";
import { LogoutUser } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutBtn = () => {
  const router = useRouter();
  const callbackLogoutSuccess = () => {
    router.push("/dashboard");
  };

  const callbackLogoutError = (message: string) => {
    toast.error(message);
  };

  const { mutate: logoutMutate } = LogoutUser(
    callbackLogoutSuccess,
    callbackLogoutError
  );
  return (
    <div>
      {/* Logout Section */}
      <div>
        <button
          className="text-md font-medium mb-1 cursor-pointer"
          onClick={() => logoutMutate()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutBtn;
