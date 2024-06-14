import { axiosInstance } from './axiosInstance';


export const postRegister = async (data) => {
  try {
    const response = await axiosInstance.post('/users/register', data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const postLogin = async (data) => {
  console.log("🚀 ~ postLogin ~ data:", data)
  try {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};
