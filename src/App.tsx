import React, { useEffect, useState } from 'react';
import { fetchRestaurants } from './apiService';
import CardComponent from './Components/CardComponent';
import SearchBar from './Components/SearchBar';

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<{ id: number, name: string, cusine: string, image: string }[]>([]);

  useEffect(() => {
    const loadRestaurants = async () => {
      const data = await fetchRestaurants();
      setRestaurants(data);
    };
    loadRestaurants();
  }, []);

  const CardContainer: React.FC<{ restaurantsList: { id: number, name: string, cusine: string, image: string }[] }> = ({ restaurantsList }) => {
    return (
      <>
        {restaurantsList.map((restaurant) => (
          <CardComponent restaurant={restaurant} key={restaurant.id} />
        ))}
      </>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Food Delight</h1>
      <SearchBar setRestaurants={setRestaurants} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        <CardContainer restaurantsList={restaurants} />
      </div>
    </div>
  );
};

export default App;
