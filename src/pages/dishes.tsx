import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { Dish } from '@/types';
import Pagination from '@/components/Pagination';

interface DishesPageProps {
  dishes: Dish[];
}

const uniqueValues = (array: string[]) => Array.from(new Set(array));

const Dishes: NextPage<DishesPageProps> = ({ dishes }) => {
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(dishes)
  const [dietFilter, setDietFilter] = useState<string>('');
  const [flavorFilter, setFlavorFilter] = useState<string>('');
  const [stateFilter, setStateFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dishesPerPage = 10; // Number of dishes per page

  // Extract unique filter values
  const diets = uniqueValues(dishes.map(dish => dish.diet));
  const flavors = uniqueValues(dishes.map(dish => dish.flavor_profile));
  const states = uniqueValues(dishes.map(dish => dish.state));

  // Calculate total pages
  const totalPages = Math.ceil(filteredDishes.length / dishesPerPage);

  // Paginate dishes
  const paginatedDishes = filteredDishes.slice(
    (currentPage - 1) * dishesPerPage,
    currentPage * dishesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setFilteredDishes(dishes.filter(
        (dish) =>
          (dietFilter === '' || dish.diet === dietFilter) &&
          (flavorFilter === '' || dish.flavor_profile === flavorFilter) &&
          (stateFilter === '' || dish.state === stateFilter)
    ))
    setCurrentPage(1)
  },[stateFilter, flavorFilter, dietFilter,dishes])

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-8">Our Dish List</h1>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <select value={dietFilter} onChange={(e) => setDietFilter(e.target.value)} className="p-2 border rounded-md">
          <option value="">All Diets</option>
          {diets.map((diet) => (
            <option key={diet} value={diet}>
              {diet}
            </option>
          ))}
        </select>

        <select value={flavorFilter} onChange={(e) => setFlavorFilter(e.target.value)} className="p-2 border rounded-md">
          <option value="">All Flavors</option>
          {flavors.map((flavor) => (
            <option key={flavor} value={flavor}>
              {flavor}
            </option>
          ))}
        </select>

        <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="p-2 border rounded-md">
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Dish Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Ingredients</th>
              <th className="p-4 text-left hidden md:table-cell">Diet</th>
              <th className="p-4 text-left hidden md:table-cell">Prep Time</th>
              <th className="p-4 text-left hidden md:table-cell">Cook Time</th>
              <th className="p-4 text-left hidden md:table-cell">Flavor Profile</th>
              <th className="p-4 text-left hidden md:table-cell">Course</th>
              <th className="p-4 text-left hidden md:table-cell">State</th>
              <th className="p-4 text-left hidden md:table-cell">Region</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDishes.length > 0 ? (
              paginatedDishes.map((dish) => (
                <tr key={dish.id} className="border-t border-gray-300 hover:bg-blue-50 transition-colors">
                  <td className="p-4">
                    <Link href={`/dishes/${dish.id}`}>
                      <div className="text-blue-500 hover:underline cursor-pointer">{dish.name}</div>
                    </Link>
                  </td>
                  <td className="p-4">{dish.ingredients}</td>
                  <td className="p-4 hidden md:table-cell">{dish.diet}</td>
                  <td className="p-4 hidden md:table-cell">{dish.prep_time}</td>
                  <td className="p-4 hidden md:table-cell">{dish.cook_time}</td>
                  <td className="p-4 hidden md:table-cell">{dish.flavor_profile}</td>
                  <td className="p-4 hidden md:table-cell">{dish.course}</td>
                  <td className="p-4 hidden md:table-cell">{dish.state}</td>
                  <td className="p-4 hidden md:table-cell">{dish.region}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="p-4 text-center">
                  No dishes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredDishes.length > dishesPerPage && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  try {
    const response = await fetch(`${apiUrl}/dishes`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      props: {
        dishes: data,
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

export default Dishes;
