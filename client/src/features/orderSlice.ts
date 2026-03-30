import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../interfaces/slicesInitialStates.interface';
import { createOrderAPI } from '../services/Checkout/checkout';

const initialState: Types.InitialOrderState = {
    test: 'test',
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        placeOrder: (state, action: PayloadAction<{ isAddress: any }>) => {
            const isLogged = window.sessionStorage.getItem('isLogged');
            
            if (isLogged === 'true') {
                // Server requires only { address } in the request body
                createOrderAPI(action.payload.isAddress);
            } else {
                // Guest checkout logic or redirect to login
                console.log("Guest checkout or redirect to login");
            }
        },
    },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;