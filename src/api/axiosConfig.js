import axios from 'axios';
import Cookies from 'js-cookie';  

const csrfToken = Cookies.get('XSRF-TOKEN');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', 
  withCredentials: true, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'XSRF-TOKEN': csrfToken
  },
});



export default axiosInstance;
