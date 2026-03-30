import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers from slices
import userReducer from '../features/userSlice';
import cartReducer from '../features/cartSlice';
import orderReducer from '../features/orderSlice';
import addressReducer from '../features/addressSlice';

/**
 * Configuration for Redux Persist
 * key: 'root' stores the state under the 'persist:root' key in localStorage
 */
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

/**
 * Combine all reducers into a single root reducer
 * Renamed 'allCart' to 'cart' for consistency with slice names and Auth guards
 */
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    address: addressReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // Middleware configuration to disable serializable checks for redux-persist actions
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;