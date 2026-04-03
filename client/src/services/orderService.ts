import axiosInstance from '../utils/axiosInstance';

export const createOrderAPI = async (address: string) => {
    const response = await axiosInstance.post('/order/', { address });
    return response.data;
};

export const getMyOrdersAPI = async () => {
    const response = await axiosInstance.get('/order/my-orders');
    return response.data;
};