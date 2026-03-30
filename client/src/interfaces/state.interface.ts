import { ICartItem } from './cart.interface';
import { IAddress } from './order.interface';

export interface InitialAddressState {
    isAddress: IAddress;
}

export interface InitialCartState {
    cart: ICartItem[];
    totalPrice: number;
    totalQuantity: number;
    warningMessage: string | null | false;
}

export interface InitialOrderState {
    test: string;
}

export interface InitialUserState {
    profile: string;
    user: boolean;
    loginError: string | false;
    isAdmin: boolean;
    userId: string | null | false;
}