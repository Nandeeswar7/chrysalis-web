import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { DishType } from '@/types';

interface DishDetailsPageProps {
  dish: DishType;
}

const DishDetails: NextPage<DishDetailsPageProps> = ({ dish }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="container mx-auto mt-16">
        {/* Page title */}
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">{dish.name}</h1>

        {/* Dish information */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 max-w-3xl mx-auto">
          <div className="text-lg font-semibold text-gray-800">
            <span className="font-bold">Ingredients:</span> {dish.ingredients.join(', ')}
          </div>

          <div className="text-lg font-semibold text-gray-800">
            <span className="font-bold">Diet:</span>{' '}
            <span className={`font-bold ${dish.diet === 'non vegetarian' ? 'text-red-500' : 'text-green-500'}`}>
              {dish.diet}
            </span>
          </div>

          <div className="text-lg font-semibold text-gray-800">
            <span className="font-bold">Preparation Time:</span> {dish.prep_time} minutes
          </div>

          <div className="text-lg font-semibold text-gray-800">
            <span className="font-bold">Cooking Time:</span> {dish.cook_time} minutes
          </div>

          <div className="text-lg font-semibold text-gray-800">
            <span className="font-bold">Flavor Profile:</span> {dish.flavor_profile}
          </div>

          <div className="text-lg font-semibold text-gray-800">
            <span className="font-bold">Course:</span> {dish.course}
          </div>

          <div className="text-lg font-semibold text-gray-800">
            <span className="font-bold">State:</span> {dish.state}
          </div>

          <div className="text-lg font-semibold text-gray-800">
            <span className="font-bold">Region:</span> {dish.region}
          </div>
        </div>

        {/* Back to list button */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
            onClick={() => router.push('/dishes')}
          >
            &larr; Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  try {
    const response = await fetch(`${apiUrl}/dishes/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      props: {
        dish: data,
      },
    };
  } catch (error) {
    console.error('Error fetching dish details:', error);
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
};

export default DishDetails;
