import React from "react";
import ContentForm from "../../../Components/ContentForm";
import Sidebar from "@/Components/Sidebar";

const EditContentPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ContentForm isEdit={true} />
    </div>
  );
};

export default EditContentPage;
