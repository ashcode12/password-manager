import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const addPassword = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/add-password`, data);
    return response.data;
  } catch (error) {
    console.error('Error adding password:', error);
    throw error;
  }
};

export const getPassword = async (name) => {
  try {
    const response = await axios.get(`${apiUrl}/get-password/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving password:', error);
    throw error;
  }
};

export const listPasswords = async () => {
  try {
    const response = await axios.get(`${apiUrl}/list-passwords`);
    return response.data;
  } catch (error) {
    console.error('Error listing passwords:', error);
    throw error;
  }
};
