import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': "application/json",
  }
});

const loginPost = async (username, password) => {
  const res = await axios.post('http://127.0.0.1:5000/api/auth/login', { username, password });
  return res.data;
}

export { axiosInstance, loginPost } 