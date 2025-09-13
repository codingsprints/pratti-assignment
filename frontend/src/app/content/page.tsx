import Sidebar from "@/Components/Sidebar";
import ContentForm from "../../Components/ContentForm";

export default function GenerateContentForm() {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <ContentForm isEdit={false} />
      </div>
    </>
  );
}
