import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../interfaces/cart.interface';
import * as CartAPI from '../services/cartService';

/**
 * Interface for the cart state
 */
interface CartState {
    items: ICartItem[];
    totalPrice: number;
    totalQuantity: number;
    loading: boolean;
    error: string | null;
    warningMessage: boolean;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    loading: false,
    error: null,
    warningMessage: false,
};

// --- Async Thunks ---

export const addToCartThunk = createAsyncThunk(
    'cart/add',
    async (product: ICartItem, { rejectWithValue }) => {
        try {
            const isLogged = window.sessionStorage.getItem('isLogged') === 'true';
            if (isLogged) {
                await CartAPI.addToCartAPI(product._id, 1, product.price);
            }
            return product;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateQuantityThunk = createAsyncThunk(
    'cart/updateQuantity',
    async ({ productId, action, price }: { productId: string; action: 'inc' | 'dec'; price: number }, { rejectWithValue }) => {
        try {
            const isLogged = window.sessionStorage.getItem('isLogged') === 'true';
            if (isLogged) {
                await CartAPI.updateQuantityAPI(productId, action);
            }
            return { productId, action, price };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeItemThunk = createAsyncThunk(
    'cart/removeItem',
    async (item: ICartItem, { rejectWithValue }) => {
        try {
            const isLogged = window.sessionStorage.getItem('isLogged') === 'true';
            if (isLogged) {
                await CartAPI.removeItemAPI(item._id);
            }
            return item;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const resetCartThunk = createAsyncThunk(
    'cart/reset',
    async (_, { rejectWithValue }) => {
        try {
            const isLogged = window.sessionStorage.getItem('isLogged') === 'true';
            if (isLogged) {
                await CartAPI.resetCartAPI();
            }
            return;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// --- Slice ---

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setUserCart: (state, action: PayloadAction<{ cart: ICartItem[]; totalItemsInCart: number; totalPrice: number }>) => {
            state.items = action.payload.cart;
            state.totalQuantity = action.payload.totalItemsInCart;
            state.totalPrice = action.payload.totalPrice;
        },
        resetOnLogOut: () => initialState,
        clearWarning: (state) => {
            state.warningMessage = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Add to Cart
            .addCase(addToCartThunk.fulfilled, (state, action: PayloadAction<ICartItem>) => {
                const itemIndex = state.items.findIndex(item => item._id === action.payload._id);
                if (itemIndex >= 0) {
                    const item = state.items[itemIndex];
                    if (item.quantity - item.itemQuantity > 0) {
                        item.itemQuantity++;
                        state.totalPrice += action.payload.price;
                    } else {
                        state.warningMessage = true;
                    }
                } else {
                    state.items.push({ ...action.payload, itemQuantity: 1 });
                    state.totalPrice += action.payload.price;
                    state.totalQuantity += 1;
                }
            })
            // Update Quantity (Inc/Dec)
            .addCase(updateQuantityThunk.fulfilled, (state, action) => {
                const item = state.items.find(i => i._id === action.payload.productId);
                if (item) {
                    if (action.payload.action === 'inc') {
                        if (item.quantity - item.itemQuantity > 0) {
                            item.itemQuantity++;
                            state.totalPrice += action.payload.price;
                        } else {
                            state.warningMessage = true;
                        }
                    } else if (action.payload.action === 'dec' && item.itemQuantity > 1) {
                        item.itemQuantity--;
                        state.totalPrice -= action.payload.price;
                    }
                }
            })
            // Remove Item
            .addCase(removeItemThunk.fulfilled, (state, action: PayloadAction<ICartItem>) => {
                const itemIndex = state.items.findIndex(item => item._id === action.payload._id);
                if (itemIndex !== -1) {
                    const item = state.items[itemIndex];
                    state.totalPrice -= (item.itemQuantity * item.price);
                    state.totalQuantity -= 1;
                    state.items.splice(itemIndex, 1);
                }
            })
            // Reset Cart
            .addCase(resetCartThunk.fulfilled, (state) => {
                return initialState;
            });
    }
});

export const { setUserCart, resetOnLogOut, clearWarning } = cartSlice.actions;
export default cartSlice.reducer;