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
    console.log("🚀 ~ postLogin ~ response:", response)
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};

export const postIdCheck = async (data) => {
  console.log("🚀 ~ postLogin ~ data:", data)
  try {
    const response = await axiosInstance.post('/auth/idCheck', data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};

export const postEmailCheck = async (data) => {
  console.log("🚀 ~ postLogin ~ data:", data)
  try {
    const response = await axiosInstance.post('/auth/idCheck', data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};

export const postLoginCheck = async () => {
  try {
    const response = await axiosInstance.get('/auth/loginCheck');
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};

export const postLogout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};
