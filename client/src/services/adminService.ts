import axiosInstance from '../utils/axiosInstance';

export const createProductAPI = async (formData: FormData) => {
    return await axiosInstance.post('/product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateProductAPI = async (id: string, formData: FormData) => {
    return await axiosInstance.patch(`/product/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteProductAPI = async (id: string) => {
    return await axiosInstance.delete(`/product/${id}`);
};