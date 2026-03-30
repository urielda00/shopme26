export interface ICartItem {
    _id: string;
    productName: string;
    price: number;
    quantity: number; // Stock level
    itemQuantity: number; // User's selected quantity
    image?: string;
    category?: string;
}