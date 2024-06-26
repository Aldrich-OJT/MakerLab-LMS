import axios from 'axios';

const baseURL = 'http://192.168.1.208:5000';

const axiosRequest = async (method, URL, token, data, contentType) => {
  try {
    const config = {
      method,
      url: `${baseURL}${URL}`,
      headers: {
        'Content-Type': contentType ?? "application/json",
      },
      withCredentials: true,
    };
  

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error?.status);
    console.log(`Error in ${method} request to ${URL}:`, error?.response?.data?.message);
    
    throw error?.response;
  
  }
};

export const axiosPost = async (URL, data, contentType, token) => {
  return await axiosRequest('post', URL, token, data, contentType);
};

export const axiosGet = async (URL, token, responseType) => {
  return await axiosRequest('get', URL, token, responseType);
};

export const axiosPut = async (URL, data, contentType, token) => {
  return await axiosRequest('put', URL, token, data, contentType,);
};

export const axiosDelete = async (URL,token) => {
  return await axiosRequest('delete', URL, token);
};
