import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-blue-50 px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-blue-500 text-center mb-8">
        Your Ultimate Culinary Destination: Discover a World of Delicious Recipes and Inspiration for Your Next Meal
      </h1>
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <Link href="/dishes">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition-colors cursor-pointer text-center">
            Explore Dishes
          </span>
        </Link>
        <Link href="/suggestions">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition-colors cursor-pointer text-center">
            Cook With What You Have
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
