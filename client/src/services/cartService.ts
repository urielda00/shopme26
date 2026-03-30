import axiosInstance from '../../utils/axiosInstance';

// Add product: POST /cart/add
export const addToCartAPI = (productId: string, quantity: number, price: number) => {
    return axiosInstance.post('/cart/add', { productId, quantity, price });
};

// Update quantity: PATCH /cart/update-quantity
export const updateQuantityAPI = (productId: string, action: 'inc' | 'dec') => {
    return axiosInstance.patch('/cart/update-quantity', { productId, action });
};

// Remove single item: DELETE /cart/item/:productId
export const removeItemAPI = (productId: string) => {
    return axiosInstance.delete(`/cart/item/${productId}`);
};

// Clear cart: DELETE /cart/reset
export const resetCartAPI = () => {
    return axiosInstance.delete('/cart/reset');
};

// Sync local cart: POST /cart/sync
export const syncCartAPI = (localProducts: any[]) => {
    return axiosInstance.post('/cart/sync', { localProducts });
};

// Get cart: GET /cart/
export const getCartAPI = () => {
    return axiosInstance.get('/cart/');
};