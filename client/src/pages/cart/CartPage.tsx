import { FC } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
// Import the new Thunks
import { updateQuantityThunk, removeItemThunk } from '../../features/cartSlice';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import { ICartItem } from '../../interfaces'; 
import { pageContainerSx } from './Cart.styles';
import { commonContainerSx } from '../../styles/common.styles';

const CartPage: FC = () => {
    // Select items and totals from the new state structure
    const { items, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    if (items.length === 0) {
        return (
            <Box sx={pageContainerSx}>
                <Container sx={{ py: 10, textAlign: 'center' }}>
                    <Typography variant="h5">Your shopping cart is empty.</Typography>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={[commonContainerSx, { bgcolor: 'var(--containerPinkBackground)', py: 4 }]}>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', fontFamily: '"Tilt Prism", cursive' }}>
                    Shopping Cart
                </Typography>
                
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 1, overflow: 'hidden' }}>
                            {items.map((item: ICartItem) => (
                                <CartItem 
                                    key={item._id}
                                    item={item}
                                    // Passing the logic via Thunks
                                    onIncrement={() => dispatch(updateQuantityThunk({ productId: item._id, action: 'inc', price: item.price }))}
                                    onDecrement={() => dispatch(updateQuantityThunk({ productId: item._id, action: 'dec', price: item.price }))}
                                    onRemove={() => dispatch(removeItemThunk(item))}
                                />
                            ))}
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        {/* Summary now only needs to consume from store or props, we'll keep props for purity */}
                        <CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CartPage;