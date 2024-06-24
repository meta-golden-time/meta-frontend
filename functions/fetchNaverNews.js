const axios = require('axios');

const NAVER_NEWS_API_URL = 'https://openapi.naver.com/v1/search/news.json';
const NAVER_CLIENT_ID = 'hocsbGo_VMFE8dCIgvoF';
const NAVER_CLIENT_SECRET = 'KoLNbQs04S';

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.query || 'latest news';
  const url = `${NAVER_NEWS_API_URL}?query=${query}`;
  const headers = {
    'X-Naver-Client-Id': NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
  };

  try {
    const response = await axios.get(url, { headers });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)  // JSON 문자열로 변환하여 반환
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() })  // 에러도 JSON 문자열로 변환하여 반환
    };
  }
};
