import { axiosInstance } from './axiosInstance';

export const postBookMark = async (data) => {
  try {
    const response = await axiosInstance.post('/bookmark/add', data);
    console.log("🚀 ~ postBookMark ~ response:", response)
    return response.data;
  } catch (error) {
    console.error('Error during bookmark addition:', error);
    throw error;
  }
};

