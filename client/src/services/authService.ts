import axiosInstance from '../utils/axiosInstance';
import { IFormValues } from '../interfaces/auth.interface';

export const registerAPI = async (data: IFormValues) => {
    return await axiosInstance.post('/auth/register', data);
};

export const loginAPI = async (credentials: Pick<IFormValues, 'userName' | 'password'>) => {
    return await axiosInstance.post('/auth/login', credentials);
};

export const logoutAPI = async () => {
    return await axiosInstance.post('/auth/logout');
};

export const getMeAPI = async () => {
    return await axiosInstance.get('/auth/me');
};