import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://20.187.63.123:5000/api', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
