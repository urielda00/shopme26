import mongoose from "mongoose";

/**
 * Cart Item Sub-Schema
 * Represents an individual product in the cart.
 * Stores priceAtAdd to freeze the price at the moment of addition, preventing unexpected cart total changes if the global product price changes.
 */
const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    priceAtAdd: {
        type: Number,
        required: true,
    },
});

/**
 * Cart Schema
 * Represents the active shopping cart for a user.
 * Maintains aggregated totals for performance optimization, reducing the need for on-the-fly calculations.
 */
const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        products: [CartItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        totalItemsInCart: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true },
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;