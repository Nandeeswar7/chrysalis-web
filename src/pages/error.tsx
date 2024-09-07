import React from 'react';
import { useRouter } from 'next/router';

const Custom500: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">500</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">Internal Server Error</h2>
      <p className="text-gray-500 mt-2">Something went wrong on our end.</p>
      <button 
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => router.push('/')}
      >
        Go Back to Homepage
      </button>
    </div>
  );
};

export default Custom500;
