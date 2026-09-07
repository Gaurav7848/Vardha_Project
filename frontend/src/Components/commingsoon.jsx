import React from 'react';
import not from "../assets/PageNotFound.webp"
const NotFound = () => {
  return (
    <div className="min-h-screen bg-white/90 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full">
        {/* Ensure PageNotFound.jpg is in your /public folder */}
        <img 
          src={not}
          alt="404 Page Not Found" 
          className="w-full max-w-md mx-auto"
        />

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Under Construction?
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          It looks like the page you are looking for hasn't been built yet or has been moved to another site.
        </p>

        <a 
          href="/"
          className="inline-block bg-[#ce5a28] hover:bg-[#a64820] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg"
        >
          Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;