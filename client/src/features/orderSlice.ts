// not in use right now.
import { createSlice } from '@reduxjs/toolkit';
import { InitialOrderState } from '../interfaces/state.interface';

const initialState: InitialOrderState = {
    test: 'test',
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
});

export default orderSlice.reducer;