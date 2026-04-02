import mongoose from "mongoose";

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
    // priceAtAdd must be inside CartItemSchema
    priceAtAdd: {
        type: Number,
        required: true,
    },
});

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