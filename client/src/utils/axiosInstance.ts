import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_BACK_URL || 'http://localhost:5000/api', 
    withCredentials: true, // Required for JWT cookies
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("RAW SERVER RESPONSE:", error.response?.data);
        // Handle unified error structure: { success, message, errors }
        const serverError = error.response?.data;
        return Promise.reject({
            message: serverError?.message || 'Something went wrong',
            errors: serverError?.errors || []
        });
    }
);

export default axiosInstance;