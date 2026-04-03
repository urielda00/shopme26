import axiosInstance from '../utils/axiosInstance';

export interface AdminOverviewResponse {
    overview: {
        totals: {
            products: number;
            users: number;
            orders: number;
            invoices: number;
            revenue: number;
            totalUnits: number;
            inventoryValue: number;
        };
        products: {
            active: number;
            outOfStock: number;
            lowStock: number;
        };
        orderStatus: {
            pending: number;
            processing: number;
            shipped: number;
            delivered: number;
            cancelled: number;
        };
        recentOrders: any[];
        recentUsers: any[];
    };
}

export interface AdminPagedResponse<T> {
    items: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
    };
}

export const searchProductsAPI = async (key: string) => {
    return await axiosInstance.get('/product/searchProduct', {
        params: { key },
    });
};

export const getProductByIdAPI = async (id: string) => {
    return await axiosInstance.get(`/product/${id}`);
};

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

export const getAdminOverviewAPI = async () => {
    return await axiosInstance.get<AdminOverviewResponse>('/admin/overview');
};

export const getAdminProductsAPI = async (params: Record<string, unknown>) => {
    return await axiosInstance.get<AdminPagedResponse<any>>('/admin/products', { params });
};

export const getAdminUsersAPI = async (params: Record<string, unknown>) => {
    return await axiosInstance.get<AdminPagedResponse<any>>('/admin/users', { params });
};

export const updateAdminUserAPI = async (id: string, payload: Record<string, unknown>) => {
    return await axiosInstance.patch(`/admin/users/${id}`, payload);
};

export const deleteAdminUserAPI = async (id: string) => {
    return await axiosInstance.delete(`/admin/users/${id}`);
};

export const getAdminOrdersAPI = async (params: Record<string, unknown>) => {
    return await axiosInstance.get<AdminPagedResponse<any>>('/admin/orders', { params });
};

export const updateAdminOrderStatusAPI = async (id: string, status: string) => {
    return await axiosInstance.patch(`/admin/orders/${id}/status`, { status });
};

export const getAdminInvoicesAPI = async (params: Record<string, unknown>) => {
    return await axiosInstance.get<AdminPagedResponse<any>>('/admin/invoices', { params });
};
