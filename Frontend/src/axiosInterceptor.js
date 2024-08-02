import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'ictak-internship-portalserver-veena-s-projects.vercel.app',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      // You might want to use 'Authorization' header instead
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
