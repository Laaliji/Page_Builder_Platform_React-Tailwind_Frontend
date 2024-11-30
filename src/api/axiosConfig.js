import axios from 'axios';
import Cookies from 'js-cookie';  // Import js-cookie to manage cookies

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Your Laravel backend URL
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Function to fetch the CSRF token and set it in the cookies
export const fetchCSRFToken = async () => {
  try {
    // This will set the CSRF token in cookies if successful
    await axiosInstance.get('/sanctum/csrf-cookie');
    console.log('CSRF token set in cookies.');
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

// Function to retrieve CSRF token from the cookies
export const getCSRFToken = () => {
  const csrfToken = Cookies.get('XSRF-TOKEN');  // Retrieve CSRF token from cookies
  if (!csrfToken) {
    console.error('CSRF token not found in cookies!');
  }
  return csrfToken;
};

export default axiosInstance;
