import { ICartItem } from './cart.interface';
import { IAddress } from './order.interface';

/**
 * State for the Address slice
 */
export interface InitialAddressState {
    isAddress: IAddress;
}

/**
 * State for the Cart slice - synced with cartSlice logic
 */
export interface InitialCartState {
    items: ICartItem[];       // Changed 'cart' to 'items' to match slice
    totalPrice: number;
    totalQuantity: number;
    loading: boolean;
    error: string | null;
    warningMessage: boolean;  // Changed to boolean to match slice logic
}

/**
 * State for the Order slice
 */
export interface InitialOrderState {
    test: string;
}

/**
 * State for the User/Auth slice
 */
export interface InitialUserState {
    profile: string;
    user: boolean;
    loginError: string | false;
    isAdmin: boolean;
    userId: string | null | boolean;
}