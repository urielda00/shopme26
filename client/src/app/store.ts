import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers from slices
import userReducer from '../features/userSlice';
import cartReducer from '../features/cartSlice';
import orderReducer from '../features/orderSlice';
import addressReducer from '../features/addressSlice';

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    address: addressReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Export persistor for PersistGate in index.tsx
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;