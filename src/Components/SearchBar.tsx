import { useState } from "react";
import { searchRestaurant } from "./../apiService";

const findRestaurant = async (findName: string) => {
  if (findName === '') return [];
  const data = await searchRestaurant(findName);
  console.log('Data', data);
  return data;
};

const SearchBar = ({ setRestaurants }) => {
  const [findName, setFindName] = useState<string>('');

  return (
    <div>
      <form onSubmit={async (e) => {
        e.preventDefault();
        const filteredRestaurants = await findRestaurant(findName);
        setRestaurants(filteredRestaurants);
      }}>
        <input
          type="text"
          value={findName}
          onChange={(e) => setFindName(e.target.value)}
          placeholder="Search"
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;