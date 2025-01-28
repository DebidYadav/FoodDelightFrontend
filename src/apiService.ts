import axios from 'axios';

//Fetch restaurants
export const fetchRestaurants = async () =>{
  const response = await axios.get('http://localhost:3000/api/get-restaurants');
  return response.data;
}

//Search restaurant based on name
export const searchRestaurant = async (findName: any) => {
  const response = await axios.get('http://localhost:3000/api/get-restaurantByName', {params: {name: findName}});
  return response;
}