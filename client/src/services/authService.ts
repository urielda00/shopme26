import axiosInstance from '../utils/axiosInstance';
import { FormValues } from '../interfaces/auth.interface'; 

/**
 * Register a new user
 * Route: POST /auth/register
 */
export const registerAPI = async (data: FormValues) => {
    // Using the unified axiosInstance with credentials
    return await axiosInstance.post('/auth/register', data);
};

/**
 * Login user
 * Route: POST /auth/login
 */
export const loginAPI = async (credentials: Pick<FormValues, 'email' | 'password'>) => {
    // Server will set the JWT cookie automatically
    return await axiosInstance.post('/auth/login', credentials);
};

/**
 * Logout user
 * Route: POST /auth/logout
 */
export const logoutAPI = async () => {
    // Server clears the cookie, we clear local state
    return await axiosInstance.post('/auth/logout');
};