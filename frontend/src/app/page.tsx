import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-gray-300 rounded-sm inline-block"></span>
          <span className="font-bold text-lg">HO</span>
        </div>
        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-black">
            About
          </Link>
          <Link href="/register" className="text-gray-700 hover:text-black">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-stone-950">
          Create content 10x faster with AI – <br className="hidden md:block" />{" "}
          in-English or Hindi
        </h1>
        <ul className="text-gray-600 mb-6 space-y-2 flex flex-col items-start list-disc">
          <li>Write blogs, social posts, emails in seconds.</li>
          <li>Supports multiple languages</li>
        </ul>
        <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium">
          Try for Free
        </button>
      </main>

      {/* Footer Cards */}
      <footer className="flex flex-wrap justify-center gap-4 px-6 py-8">
        <div className="w-60 h-24 bg-gray-200 rounded-md"></div>
        <div className="w-60 h-24 bg-gray-200 rounded-md"></div>
        <div className="w-60 h-24 bg-gray-200 rounded-md"></div>
      </footer>
    </div>
  );
};

export default HomePage;
