// src/api.js
import axios from 'axios';
import superagent from 'superagent';
import  { format } from 'date-fns';



const API_URL = 'http://ec2-43-203-242-73.ap-northeast-2.compute.amazonaws.com:3000';


export const getData = async() => {
  console.log(JSON.stringify());
  
    
    const result = await fetchData();
    console.log("🚀 ~ getData ~ result:", result)
    
    return result;
};

export const postData = (data) => {
  return axios.post(`${API_URL}/data`, data);
};

export const updateData = (id, data) => {
  return axios.put(`${API_URL}/data/${id}`, data);
};

export const deleteData = (id) => {
  return axios.delete(`${API_URL}/data/${id}`);
};

const fetchData = async () => {
  try {
    const params = {
      gridX: 55,
      gridY: 125,
    };

    const apiURL = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
    const nowFormat = format(new Date(), 'yyyyMMdd');
    let result;

    // callback
    const responseData = await superagent
      .get(apiURL)
      .query({
        ServiceKey: '5AixXeDNsKuyZ6zDiEY2sB5yTjp6RMUt0g+crj1vwJ8JZDDnkJ31fLeOg2rqahoBsyf1meC4oS2UlV4aggcgyg==',
        pageNo: '1',
        numOfRows: '10000',
        dataType: 'JSON',
        base_date: nowFormat,
        base_time: '0500',
        nx: params.gridX,
        ny: params.gridY,
      }); // query string

    const textData = JSON.parse(responseData.text);
    result = textData.response.body.items.item;
    const nowTime = `${format(new Date(), 'HH')}00`;
    // eslint-disable-next-line max-len
    result = result.filter((weather) => weather.fcstDate === nowFormat && weather.fcstTime === nowTime);
    console.log("🚀 ~ fetchData ~ result:", result)
   
      return result;
   
  } catch (err) {
   
    console.error('Error fetching data:', err);
  }

  
}