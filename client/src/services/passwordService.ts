import axiosInstance from '../utils/axiosInstance';

export const forgotPasswordAPI = async (email: string) => {
    return await axiosInstance.post('/resetPass/', { email });
};

export const resetPasswordAPI = async (id: string, token: string, passwords: { password: string, confirmPassword: string }) => {
    const url = `/resetPass/reset/${id}/${token}`;
    // Body now includes both fields as per server requirements
    return await axiosInstance.post(url, passwords); 
};