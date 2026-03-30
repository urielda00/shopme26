import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialOrderState } from '../interfaces/state.interface';
import { createOrderAPI } from '../services/orderService';

const initialState: InitialOrderState = {
    test: 'test',
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        placeOrder: (state, action: PayloadAction<{ isAddress: any }>) => {
            const isLogged = window.sessionStorage.getItem('isLogged');
            
            if (isLogged === 'true') {
                // Side effect kept as per original logic
                createOrderAPI(action.payload.isAddress);
            } else {
                console.log("Guest checkout or redirect to login");
            }
        },
    },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;