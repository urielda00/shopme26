import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface AuthUserState {
    profile: string;
    user: boolean;
    userId: string | null;
    userName: string;
    isAdmin: boolean;
    loginError: string | false;
    initialized: boolean;
}

interface LoginPayload {
    userId: string;
    userName: string;
    isAdmin: boolean;
}

interface UpdateAuthUserPayload {
    userName?: string;
}

const initialState: AuthUserState = {
    profile: '',
    user: false,
    userId: null,
    userName: '',
    isAdmin: false,
    loginError: false,
    initialized: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<LoginPayload>) => {
            state.user = true;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.isAdmin = action.payload.isAdmin;
            state.loginError = false;
            state.initialized = true;
        },

        clearAuthUser: (state) => {
            state.user = false;
            state.userId = null;
            state.userName = '';
            state.isAdmin = false;
            state.loginError = false;
            state.initialized = true;
        },

        setLoginError: (state, action: PayloadAction<string>) => {
            state.loginError = action.payload;
            state.user = false;
            state.userId = null;
            state.userName = '';
            state.isAdmin = false;
            state.initialized = true;
        },

        setAuthInitialized: (state, action: PayloadAction<boolean>) => {
            state.initialized = action.payload;
        },

        updateAuthUser: (state, action: PayloadAction<UpdateAuthUserPayload>) => {
            if (typeof action.payload.userName === 'string') {
                state.userName = action.payload.userName;
            }
        },
    },
});

export const {
    setAuthUser,
    clearAuthUser,
    setLoginError,
    setAuthInitialized,
    updateAuthUser,
} = userSlice.actions;

export default userSlice.reducer;

export const selectIsLogged = (state: RootState) => state.user.user;
export const selectIsAdmin = (state: RootState) => state.user.isAdmin;