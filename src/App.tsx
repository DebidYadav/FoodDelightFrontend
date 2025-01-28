import React, { useEffect, useState } from 'react';
import {fetchRestaurants, searchRestaurant} from './apiService';
import CardComponet from './Components/CardComponent';

const App: React.FC = () => {
  const [findName, setfindName] = useState<any>('');
  const [restaurants, setRestaurants] = useState<{id:number, name: string, cusine: string, image: string}[]>([]);

  useEffect(()=>{
    const loadRestaurants = async () =>{
      const data = await fetchRestaurants();
      setRestaurants(data);
    };
    loadRestaurants();
  },[]);

  const findRestaurant = async () => {
    if (findName.trim() === '') return;
    const data = await searchRestaurant(findName);
    setfindName((prev) => [...prev, data]);
    setfindName('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Food Delight</h1>
      <input
        type="text"
        value={findName}
        onChange={(e) => setfindName(e.target.value)}
        placeholder="Search"
      />
      <button onClick={findRestaurant}>Search</button>
      <div style={{display: 'grid', gridTemplateColumns:'repeat(4, 1fr)' ,gap: '8px'}}>
        {restaurants.map((restaurant: { id: number; name: string; cusine: string; image: string; })=>(
            <CardComponet restaurant={restaurant} />
        ))};
      </div>
    </div>
  );
};

export default App;
