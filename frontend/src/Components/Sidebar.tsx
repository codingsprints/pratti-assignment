"use client";
import { navItems } from "@/utils/constant";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col">
        {/* Logo / Avatar */}
        <div className="h-10 w-10 bg-gray-300 rounded-full mb-6"></div>

        {/* New Content Button */}
        <Link
          className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-2 rounded mb-4 text-left"
          href={"/content"}
        >
          + New Content
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 text-gray-700 text-sm">
          {navItems.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded text-left transition ${
                  isActive
                    ? "bg-gray-800 text-white font-semibold"
                    : "hover:bg-gray-100 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Button */}
        {/* <div className="mt-auto">
          <button className="text-gray-600 text-sm flex items-center hover:text-black">
            ← Logout
          </button>
        </div> */}
      </aside>
    </>
  );
};

export default Sidebar;
