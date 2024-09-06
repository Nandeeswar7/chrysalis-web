import React, { useState } from 'react';
import Link from 'next/link';

// Example dish data
const dishData = [
    {
        name: 'Pinaca',
        ingredients: 'Brown rice, fennel seeds, grated coconut, black pepper, ginger powder',
        diet: 'vegetarian',
        prep_time: 'unknown',
        cook_time: 'unknown',
        flavor_profile: 'sweet',
        course: 'dessert',
        state: 'Goa',
        region: 'West',
        id: '255',
    },
];

const uniqueValues = (array: string[]) => Array.from(new Set(array));

const Dishes: React.FC = () => {
    const [dietFilter, setDietFilter] = useState<string | ''>('');
    const [flavorFilter, setFlavorFilter] = useState<string | ''>('');
    const [stateFilter, setStateFilter] = useState<string | ''>('');

    // Extract unique filter values
    const diets = uniqueValues(dishData.map(dish => dish.diet));
    const flavors = uniqueValues(dishData.map(dish => dish.flavor_profile));
    const states = uniqueValues(dishData.map(dish => dish.state));

    // Filter dishes based on selected filters
    const filteredDishes = dishData.filter(dish =>
        (dietFilter === '' || dish.diet === dietFilter) &&
        (flavorFilter === '' || dish.flavor_profile === flavorFilter) &&
        (stateFilter === '' || dish.state === stateFilter)
    );

    return (
        <div className="min-h-screen bg-purple-50 px-4 py-8">
            <h1 className="text-3xl font-bold text-purple-600 text-center mb-8">
                Our Dish List
            </h1>

            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <select
                    value={dietFilter}
                    onChange={(e) => setDietFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">All Diets</option>
                    {diets.map(diet => (
                        <option key={diet} value={diet}>{diet}</option>
                    ))}
                </select>

                <select
                    value={flavorFilter}
                    onChange={(e) => setFlavorFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">All Flavors</option>
                    {flavors.map(flavor => (
                        <option key={flavor} value={flavor}>{flavor}</option>
                    ))}
                </select>

                <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">All States</option>
                    {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>

            {/* Dish Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
                    <thead>
                        <tr className="bg-purple-600 text-white">
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
                        {filteredDishes.length > 0 ? (
                            filteredDishes.map((dish) => (
                                <tr key={dish.id} className="border-t border-gray-300 hover:bg-purple-50 transition-colors">
                                    <td className="p-4">
                                        <Link href={`/dishes/${dish.id}`}>
                                            <div className="text-purple-600 hover:underline cursor-pointer">
                                                {dish.name}
                                            </div>
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
                                <td colSpan={9} className="p-4 text-center">No dishes found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dishes;