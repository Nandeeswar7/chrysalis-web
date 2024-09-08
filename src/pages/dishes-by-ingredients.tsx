import React, { useState, useEffect } from 'react';
import { DishType } from '@/types';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';

interface PageProps {
  allIngredients: string[];
}

const IngredientsPage: NextPage<PageProps> = ({ allIngredients }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [dishes, setDishes] = useState<Pick<DishType, "id" | "name" | "ingredients">[]>([]);
  const [ingredientSearchQuery, setIngredientSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchDishes = async () => {
    try {
      const response = await fetch('/api/dishes-by-ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch dishes: ${response.statusText}`);
      }

      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error(error)
      setError('An unknown error occurred');
    }
  };

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const filteredIngredients = allIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(ingredientSearchQuery.toLowerCase())
  );

  useEffect(() => {
    setError(null); // Clear any previous error
    if (selectedIngredients.length > 0) {
      fetchDishes();
    } else {
      setDishes([]);
    }
  }, [selectedIngredients]);

  return (
    <div className="container mx-auto p-4 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Select Ingredients</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Ingredients Section */}
        <div className="bg-white p-4 shadow-md rounded-lg max-h-[75vh] overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>

          {/* Search Field for Ingredients */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search ingredients..."
              value={ingredientSearchQuery}
              onChange={(e) => setIngredientSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtered Ingredients List */}
          <div className="flex flex-wrap gap-2">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map(ingredient => (
                <label
                  key={ingredient}
                  className={`p-2 text-xs rounded-lg cursor-pointer border-2 ${selectedIngredients.includes(ingredient)
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-300'
                    } hover:border-blue-400 transition-colors duration-300 whitespace-nowrap`}
                >
                  <input
                    type="checkbox"
                    value={ingredient}
                    checked={selectedIngredients.includes(ingredient)}
                    onChange={() => handleIngredientChange(ingredient)}
                    className="mr-2 hidden"
                  />
                  {ingredient}
                </label>
              ))
            ) : (
              <p className="text-gray-600">No ingredients match your search.</p>
            )}
          </div>
        </div>

        {/* Dishes Section */}
        <div className="md:col-span-2 bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Dishes Based on Selected Ingredients</h2>
          {error ? (
            <p className="text-red-600">{error}</p>
          ) : dishes.length > 0 ? (
            <div className="space-y-4">
              {dishes.map(dish => (
                <div key={dish.id} className="border rounded-lg p-4 shadow-md">
                  <h3 className="text-lg font-semibold">
                    <Link href={`/dishes/${dish.id}`}>
                      <span className="text-blue-600 hover:underline">{dish.name}</span>
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ingredients: {dish.ingredients?.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No dishes found for the selected ingredients.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  try {
    const response = await fetch(`${apiUrl}/ingredients`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ingredients: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      props: {
        allIngredients: data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};

export default IngredientsPage;
