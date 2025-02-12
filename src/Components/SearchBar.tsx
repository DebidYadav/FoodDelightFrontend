import { useState } from "react";
import { searchRestaurant } from "./../apiService";

const findRestaurant = async (findName: string) => {
  if (findName === '') return [];
  const data = await searchRestaurant(findName);
  return data;
};

const SearchBar = ({ setRestaurants }) => {
  const [findName, setFindName] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredRestaurants = await findRestaurant(findName);
    setRestaurants(filteredRestaurants);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={findName}
          onChange={(e) => setFindName(e.target.value)}
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;