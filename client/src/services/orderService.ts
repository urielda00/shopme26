import axiosInstance from '../utils/axiosInstance';

export const createOrderAPI = async (address: string) => {
    // Returns the response to the component, no logs here
    return await axiosInstance.post('/order/', { address });
};

export const getMyOrdersAPI = async () => {
    return await axiosInstance.get('/order/my-orders');
};