import axiosInstance from '../../utils/axiosInstance';
import { SubmitProps } from '../../interfaces/admin.interface';

export const createProductAPI = async (formData: SubmitProps) => {
    return await axiosInstance.post('/product/createProduct', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export const deleteProductAPI = async (id: string) => {
    // Clean return, let the UI handle the success message
    return await axiosInstance.post('/product/deleteProduct', { id });
};