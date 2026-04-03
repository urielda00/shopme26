import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../interfaces/cart.interface";
import * as CartAPI from "../services/cartService";
import { RootState } from "../app/store";

/**
 * Interface for the cart state
 */
interface CartState {
	items: ICartItem[];
	totalPrice: number;
	totalQuantity: number;
	loading: boolean;
	error: string | null;
	warningMessage: boolean;
}

const initialState: CartState = {
	items: [],
	totalPrice: 0,
	totalQuantity: 0,
	loading: false,
	error: null,
	warningMessage: false,
};

// --- Async Thunks ---

export const addToCartThunk = createAsyncThunk(
	"cart/add",
	async (product: ICartItem, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState;
			const isLogged = state.user.user;

			if (isLogged) {
				await CartAPI.addToCartAPI(product._id, 1, product.price);
			}

			return product;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	},
);

export const updateQuantityThunk = createAsyncThunk(
	"cart/updateQuantity",
	async (
		{ productId, action, price }: { productId: string; action: "inc" | "dec"; price: number },
		{ rejectWithValue, getState },
	) => {
		try {
			const state = getState() as RootState;
			const isLogged = state.user.user;

			if (isLogged) {
				await CartAPI.updateQuantityAPI(productId, action);
			}

			return { productId, action, price };
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	},
);

export const removeItemThunk = createAsyncThunk(
	"cart/removeItem",
	async (item: ICartItem, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState;
			const isLogged = state.user.user;

			if (isLogged) {
				await CartAPI.removeItemAPI(item._id);
			}

			return item;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	},
);

export const resetCartThunk = createAsyncThunk(
	"cart/reset",
	async (_, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState;
			const isLogged = state.user.user;

			if (isLogged) {
				await CartAPI.resetCartAPI();
			}

			return;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	},
);

// --- Slice ---

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setUserCart: (
			state,
			action: PayloadAction<{ cart: ICartItem[]; totalItemsInCart: number; totalPrice: number }>,
		) => {
			state.items = action.payload.cart;
			state.totalQuantity = action.payload.totalItemsInCart;
			state.totalPrice = action.payload.totalPrice;
		},

		resetOnLogOut: () => initialState,

		clearWarning: (state) => {
			state.warningMessage = false;
		},

		clearCart: (state) => {
			state.items = [];
			state.totalPrice = 0;
			state.totalQuantity = 0;
			state.loading = false;
			state.error = null;
			state.warningMessage = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addToCartThunk.fulfilled, (state, action: PayloadAction<ICartItem>) => {
				const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);

				if (itemIndex >= 0) {
					const item = state.items[itemIndex];

					if (item.quantity - item.itemQuantity > 0) {
						item.itemQuantity++;
						state.totalPrice += action.payload.price;
						state.totalQuantity += 1;
					} else {
						state.warningMessage = true;
					}
				} else {
					state.items.push({ ...action.payload, itemQuantity: 1 });
					state.totalPrice += action.payload.price;
					state.totalQuantity += 1;
				}
			})

			.addCase(updateQuantityThunk.fulfilled, (state, action) => {
				const item = state.items.find((i) => i._id === action.payload.productId);

				if (item) {
					if (action.payload.action === "inc") {
						if (item.quantity - item.itemQuantity > 0) {
							item.itemQuantity++;
							state.totalPrice += action.payload.price;
							state.totalQuantity += 1;
						} else {
							state.warningMessage = true;
						}
					} else if (action.payload.action === "dec" && item.itemQuantity > 1) {
						item.itemQuantity--;
						state.totalPrice -= action.payload.price;
						state.totalQuantity -= 1;
					}
				}
			})

			.addCase(addToCartThunk.rejected, (state, action) => {
				state.error = action.payload as string;
			})

			.addCase(removeItemThunk.fulfilled, (state, action: PayloadAction<ICartItem>) => {
				const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);

				if (itemIndex !== -1) {
					const item = state.items[itemIndex];

					state.totalPrice -= item.itemQuantity * item.price;
					state.totalQuantity -= item.itemQuantity;
					state.items.splice(itemIndex, 1);

					if (state.totalPrice < 0) state.totalPrice = 0;
					if (state.totalQuantity < 0) state.totalQuantity = 0;
				}
			})

			.addCase(resetCartThunk.fulfilled, () => {
				return initialState;
			});
	},
});

export const { setUserCart, resetOnLogOut, clearWarning, clearCart } = cartSlice.actions;
export default cartSlice.reducer;