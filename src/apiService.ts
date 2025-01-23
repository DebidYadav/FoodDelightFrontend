import axios from 'axios';

// Fetch all messages from the backend
export const fetchMessages = async () => {
  const response = await axios.get('http://localhost:3000/api/messages');
  return response.data;
};

// Add a new message
export const addMessage = async (content: string) => {
  const response = await axios.post('http://localhost:3000/api/messages', { content });
  return response.data;
};
