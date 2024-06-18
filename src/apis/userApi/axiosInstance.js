import axios from 'axios';




const API_URL = process.env.REACT_APP_API_USER;




export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 세션 쿠키를 포함하기 위해 설정
  headers: {
    'Content-Type': 'application/json',
  }
});

