import axios from 'axios';

//Fetch restaurants
export const fetchRestaurants = async () =>{
  const response = await axios.get('http://localhost:3000/api/get-restaurants');
  return response.data;
}

//Search restaurant based on name
export const searchRestaurant = async (findName: any) => {
  const response = await axios.get('http://localhost:3000/api/get-restaurantByName', {params: {name: findName}});
  return response.data;
}

// I want to create a post api to add a new customer to the database request body includes username, email, password
export const addCustomer = async (formData: any) => {
  const response = await axios.post('http://localhost:3000/api/signup', formData);
  return response.data;
}

// I want to create a post api to login a customer to the database request body includes email, password
export const loginCustomer = async (formData: any) => {
  const response = await axios.post('http://localhost:3000/api/login', formData);
  return response.data;
}