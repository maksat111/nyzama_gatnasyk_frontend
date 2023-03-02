import axios from 'axios';
import { getToken } from '../utils/index';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': "application/json",
    'x-access-token': getToken()
  }
});

const loginPost = async (username, password) => {
  const res = await axios.post('http://127.0.0.1:5000/api/auth/login', { username, password });
  return res.data;
}

export { axiosInstance, loginPost } 