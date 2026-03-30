import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../interfaces/slicesInitialStates.interface';

const initialState: Types.InitialUserState = {
    profile: '',
    user: false,
    userId: false,
    isAdmin: false,
    loginError: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logged: (state, action: PayloadAction<string | boolean>) => {
            state.user = true;
            state.isAdmin = false;
            state.loginError = false;
            state.userId = action.payload;
        },

        errorLogged: (state, action: PayloadAction<string>) => {
            state.userId = false;
            state.loginError = action.payload;
        },

        loggedOut: (state) => {
            // Clearing storage should ideally happen in a Thunk or Component, not here
            window.localStorage.clear();
            window.sessionStorage.clear();
            
            state.user = false;
            state.userId = false;
            state.isAdmin = false;
            state.loginError = false;
            
            window.location.replace('/login');
        },

        isAdmin: (state, action: PayloadAction<string | boolean>) => {
            state.userId = action.payload;
            state.user = true;
            state.isAdmin = true;
            state.loginError = false;
        },
    },
});

export const { logged, errorLogged, loggedOut, isAdmin } = userSlice.actions;
export default userSlice.reducer;