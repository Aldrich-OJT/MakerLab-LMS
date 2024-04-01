import axios from 'axios';


const baseURL = 'http://192.168.1.208:5000'; 

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
}
export const axiosGet = async (URL, token) => {
  try {
    const response = await axios.get(`${baseURL}${URL}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = response.data
    return data;
  } catch (error) {
    console.error('Error fetching token:', error);
    console.error(error.response.status); 
		console.error(error.response.data.message); 
    throw error;
  }
}

export function createUser(URL, data) {
  return axiosPost(URL, data);
}
  
export function login(URL, data) {
  return axiosPost(URL, data);
}

