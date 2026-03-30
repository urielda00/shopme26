import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../interfaces/slicesInitialStates.interface';
// Note: Ensure these services use the updated Axios instance with withCredentials: true
import { resetCartAPI } from '../services/Cart/resetCart';
import { removeItemAPI } from '../services/Cart/removeItem';
import { updateQuantityAPI } from '../services/Cart/updateQuantity'; // Unified function
import { addToCartAPI } from '../services/Cart/addToCart';
import { syncCartAPI } from '../services/Cart/syncCart'; // New sync function

const initialState: Types.InitialCartState = {
    cart: [],
    totalPrice: 0,
    totalQuantity: 0,
    warningMessage: false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            const isLogged = window.sessionStorage.getItem('isLogged');
            const itemIndex = state.cart.findIndex((item: any) => item._id === action.payload._id);

            if (itemIndex >= 0) {
                const item = state.cart[itemIndex];
                if (item.quantity - item.itemQuantity > 0) {
                    item.itemQuantity++;
                    state.totalPrice += action.payload.price;
                    // Server call without userName - identified by token
                    if (isLogged === 'true') addToCartAPI(action.payload._id, 1, action.payload.price);
                } else {
                    state.warningMessage = true;
                }
            } else {
                const tempProduct = { ...action.payload, itemQuantity: 1 };
                state.cart.push(tempProduct);
                state.totalPrice += action.payload.price;
                state.totalQuantity += 1;
                if (isLogged === 'true') addToCartAPI(action.payload._id, 1, action.payload.price);
            }
        },

        incrementQuantity: (state, action: PayloadAction<any>) => {
            const isLogged = window.sessionStorage.getItem('isLogged');
            const itemIndex = state.cart.findIndex((item: any) => item._id === action.payload._id);
            const item = state.cart[itemIndex];

            if (item.quantity - item.itemQuantity > 0) {
                item.itemQuantity++;
                state.totalPrice += item.price;
                // Update based on server instructions: action 'inc'
                if (isLogged === 'true') updateQuantityAPI(item._id, 'inc');
            } else {
                state.warningMessage = true;
            }
        },

        decrementQuantity: (state, action: PayloadAction<any>) => {
            const isLogged = window.sessionStorage.getItem('isLogged');
            const itemIndex = state.cart.findIndex((item: any) => item._id === action.payload._id);
            const item = state.cart[itemIndex];

            if (item.itemQuantity > 1) {
                item.itemQuantity--;
                state.totalPrice -= item.price;
                // Update based on server instructions: action 'dec'
                if (isLogged === 'true') updateQuantityAPI(item._id, 'dec');
            }
        },

        removeItem: (state, action: PayloadAction<any>) => {
            const isLogged = window.sessionStorage.getItem('isLogged');
            const itemIndex = state.cart.findIndex((item: any) => item._id === action.payload._id);

            if (itemIndex !== -1) {
                const item = state.cart[itemIndex];
                // Delete using ID in URL param
                if (isLogged === 'true') removeItemAPI(item._id);
                
                state.totalPrice -= (item.itemQuantity * item.price);
                state.totalQuantity -= 1;
                state.cart.splice(itemIndex, 1);
                state.warningMessage = false;
            }
        },

        deleteAllCart: (state) => {
            state.cart = [];
            state.totalPrice = 0;
            state.totalQuantity = 0;
            state.warningMessage = false;
            if (window.sessionStorage.getItem('isLogged') === 'true') {
                // No userName needed
                resetCartAPI(); 
            }
        },

        // Sync local cart to server after login
        syncUserCart: (state) => {
            if (state.cart.length > 0) {
                syncCartAPI(state.cart);
            }
        },

        setUserCart: (state, action: PayloadAction<{ cart: any[]; totalItemsInCart: number; totalPrice: number }>) => {
            state.cart = action.payload.cart;
            state.totalQuantity = action.payload.totalItemsInCart;
            state.totalPrice = action.payload.totalPrice;
        },

        resetOnLogOut: () => initialState,
    },
});

export const { 
    addToCart, 
    incrementQuantity, 
    decrementQuantity, 
    removeItem, 
    deleteAllCart, 
    setUserCart, 
    resetOnLogOut,
    syncUserCart 
} = cartSlice.actions;

export default cartSlice.reducer;