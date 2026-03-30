import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialAddressState } from '../interfaces/state.interface';

const initialState: InitialAddressState = {
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
        // Updated state mapping
        setAddress: (state, action: PayloadAction<InitialAddressState['isAddress']>) => {
            state.isAddress = action.payload;
        },
    },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;