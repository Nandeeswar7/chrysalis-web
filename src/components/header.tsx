import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDishes, setFilteredDishes] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const dishes = [
    'Biryani',
    'Masala Dosa',
    'Paneer Butter Masala',
    'Chicken Curry',
    'Samosa',
    'Gulab Jamun',
    'Rogan Josh',
    'Butter Chicken',
  ];

  // Filter dishes based on the search term
  useEffect(() => {
    if (searchTerm) {
      const results = dishes.filter((dish) =>
        dish.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDishes(results);
      setShowResults(true);
    } else {
      setFilteredDishes([]);
      setShowResults(false);
    }
  }, [searchTerm]);

  // Handle click outside the search box to hide results and reset size
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsSearchFocused(false); // Shrink search box when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-purple-600 text-white fixed top-0 left-0 w-full z-50 h-16 flex items-center px-4">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="text-2xl font-bold">
          <Link href='/'>Chrysalis</Link>
        </div>
        <div className="relative" ref={searchRef}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search dishes..."
            className={`rounded-md p-2 text-black focus:outline-none transition-all duration-300 ${
              isSearchFocused ? 'w-72' : 'w-32'
            }`}
          />
          {showResults && (
            <div className="absolute bg-white text-black mt-12 w-full max-h-40 overflow-y-auto rounded-md shadow-lg z-10">
              {filteredDishes.length > 0 ? (
                filteredDishes.map((dish, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-purple-200 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(dish);
                      setShowResults(false);
                      setIsSearchFocused(false); // Shrink box on selection
                    }}
                  >
                    {dish}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
