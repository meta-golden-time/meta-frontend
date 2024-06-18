import axios from 'axios';

const API_URL = 'http://ec2-43-203-242-73.ap-northeast-2.compute.amazonaws.com:3000';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 세션 쿠키를 포함하기 위해 설정
  headers: {
    'Content-Type': 'application/json',
  }
});
