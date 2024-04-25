// error/page.js
"use client";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center current-color">
      <h1 className="text-5xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-8">Something went wrong.</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorPage;
