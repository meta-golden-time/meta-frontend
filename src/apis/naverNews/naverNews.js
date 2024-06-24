import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true, // 세션 쿠키를 포함시키기 위해 설정
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchNaverNews = (postData) => {
  console.log("🚀 ~ fetchNaverNews ~ postData:", postData)
  const data = {
    query: postData,
  }
  return apiClient.post('/news/naver', data);
};

// export const fetchNaverNews = async (query = 'latest news') => {
//   console.log("🚀 ~ fetchNaverNews ~ query:", query)
  
// const url =  `https://openapi.naver.com/v1/search/news.json?query=${query}`;
//   const headers = {
//     'X-Naver-Client-Id': 'hocsbGo_VMFE8dCIgvoF',
//       'X-Naver-Client-Secret': 'KoLNbQs04S'   
//   };

//   try {
//     const response = await axios.get(url, { headers });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching Naver news:', error);
//     throw error;
//   }
// };
