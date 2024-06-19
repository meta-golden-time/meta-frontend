import { axiosInstance } from './axiosInstance';
import useLoginStore from '../../components/zustandValue.jsx';

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
  try {
    const response = await axiosInstance.post('/auth/login', data);
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
