// src/api.js
import axios from 'axios';
import superagent from 'superagent';
import  { format } from 'date-fns';


const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getData = async() => {
  console.log(JSON.stringify());
  
    
    const result = await fetchData();
    
    return result;
};

export const postData = async (data) => {
  

  const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=6Len3vQpAAAAAP-ZMeFc_7AwfoL1W7UVPw33Uv-L&response=${data}`);
  const { success } = response.data;
  if (!success) {
    return res.status(400).json({ success: false, message: 'Invalid reCAPTCHA token' });
  }
  return response;

        //return axios.post(`${API_URL}/data`, data);

};

export const updateData = (id, data) => {
  return axios.put(`${API_URL}/data/${id}`, data);
};

export const deleteData = (id) => {
  return axios.delete(`${API_URL}/data/${id}`);
};


const postCaptcha = async (data) => {
  try{
    const apiURL = `https://www.google.com/recaptcha/api/siteverify?secret=YOUR_SECRET_KEY&response=${recaptchaToken}`;

  }catch(err){
    console.error('Error fetching data:', err);
  }

}
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