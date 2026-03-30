import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../interfaces/slicesInitialStates.interface';

const initialState: Types.InitialAddressState = {
    isAddress: {
        Zip: '',
        City: '',
        Region: '',
        Country: '',
        LastName: '',
        FirstName: '',
        AddressLine: '',
    },
};

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        // Renamed action for clarity: setAddress instead of isAddress
        setAddress: (state, action: PayloadAction<Types.InitialAddressState['isAddress']>) => {
            state.isAddress = action.payload;
        },
    },
});

export default addressSlice.reducer;
export const { setAddress } = addressSlice.actions;