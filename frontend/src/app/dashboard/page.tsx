"use client";
import Sidebar from "@/Components/Sidebar";
import { FetchContents } from "@/services/contentServices";
import ContentDetails from "../../Components/ContentDetails";
import CreateContentBtn from "../../Components/CreateContentBtn";

const Dashboard = () => {
  const { data: fetchContents, isLoading: contentIsLoading } = FetchContents();

  return (
    <>
      {contentIsLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Top bar */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-lg font-medium">Dashboard</h1>
              <div className="flex gap-4">
                <button>🔍</button>
                <button>☰</button>
              </div>
            </div>

            {/* Generate Button */}

            <CreateContentBtn />
            {/* Content History */}
            <div className="mt-8">
              <h2 className="text-sm font-medium text-gray-600 mb-3">
                Content History
              </h2>
              <div className="space-y-3">
                {fetchContents?.data?.contentDto?.map((content: any) => {
                  return (
                    <ContentDetails key={content?._id} content={content} />
                  );
                })}

                {/* <div className="border rounded p-3 bg-white flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">Blog Post</p>
                    <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      //   onClick={() => alert("Update clicked")}
                    >
                      Update
                    </button>
                    <button
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      //   onClick={() => alert("Delete clicked")}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="border rounded p-3 bg-white flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => alert("Update clicked")}
                    >
                      Update
                    </button>
                    <button
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => alert("Delete clicked")}
                    >
                      Delete
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Dashboard;
