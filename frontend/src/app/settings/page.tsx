import Sidebar from "@/Components/Sidebar";

import React from "react";
import LogoutBtn from "../../Components/LogoutBtn";

const Settings = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-lg font-semibold mb-6">Settings & Subscription</h1>

        <div className="space-y-6 max-w-lg">
          {/* Upgrade Button */}
          <button className="w-full bg-gray-200 hover:bg-gray-300 py-3 rounded text-sm font-medium">
            Upgrade to Pro
          </button>

          {/* Usage Section */}
          <div>
            <h2 className="text-md font-medium mb-1">Usage</h2>
            <p className="text-sm text-gray-600">Number of words left</p>
          </div>

          {/* Payment Section */}
          <div>
            <h2 className="text-md font-medium mb-1">Payment</h2>
          </div>

          <LogoutBtn />
        </div>
      </main>
    </div>
  );
};

export default Settings;
