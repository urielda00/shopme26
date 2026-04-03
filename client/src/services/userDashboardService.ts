import axiosInstance from '../utils/axiosInstance';

export interface IUserProfile {
    userId: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    cart: any[];
    totalPrice: number;
    totalItemsInCart: number;
}

export interface IUserOrderProduct {
    productId?: {
        _id?: string;
        productName?: string;
        price?: number;
    };
    quantity: number;
    priceAtPurchase: number;
    _id?: string;
}

export interface IUserOrder {
    _id: string;
    address: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    products: IUserOrderProduct[];
}

export interface UpdateUserInfoPayload {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}

export interface UpdateUserPasswordPayload {
    insertPrePassword: string;
    password: string;
    verifyPass: string;
}

export const getMyProfileAPI = async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
};

export const getMyOrdersAPI = async () => {
    const response = await axiosInstance.get('/order/my-orders');
    return response.data;
};

export const updateUserInfoAPI = async (userId: string, payload: UpdateUserInfoPayload) => {
    const response = await axiosInstance.patch(`/auth/updateUserInfo/${userId}`, payload);
    return response.data;
};

export const updateUserPasswordAPI = async (userId: string, payload: UpdateUserPasswordPayload) => {
    const response = await axiosInstance.patch(`/auth/updateUserPass/${userId}`, payload);
    return response.data;
};