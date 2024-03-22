import axios from 'axios';


const baseURL = 'http://192.168.100.66:5000'; 

const axiosPost = async (URL, formdata) => {
  try {
    const response = await axios.post(`${baseURL}${URL}`, formdata, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, 
    });
    const data = response.data
    return data;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};
const axiosGet = async (URL) => {
  try {
    const response = await axios.get(`${baseURL}${URL}`);
    const data = response.data
    return data;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

export function createUser(URL, data) {
  return axiosPost(URL, data);
}
  
export function login(URL, data) {
  return axiosPost(URL, data);
}