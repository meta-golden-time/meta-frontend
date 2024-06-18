import axios from 'axios';

// axios 기본 URL 설정
const apiClient = axios.create({

  baseURL: 'http://ec2-43-203-242-73.ap-northeast-2.compute.amazonaws.com:3000',

  headers: {
    'Content-Type': 'application/json'
  }
});

export const createPost = (postData) => {
  return apiClient.post('/board/insert', postData);
};

export const getPosts = () => {
  return apiClient.get('/board/all');
};

export const updatePost = (id, postData) => {
  return apiClient.put(`/board/posts/${id}`, postData);
};

export const deletePost = (id, password) => {
  return apiClient.delete(`/board/posts/${id}`, {
    data: { password }
  });
};
