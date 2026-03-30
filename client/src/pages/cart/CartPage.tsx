import { FC } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import * as Actions from '../../features/cartSlice';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import { ICartItem } from '../../interfaces'; 
import { pageContainerSx } from './Cart.styles'; // New Import

const CartPage: FC = () => {
    const { cart, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    return (
        <Box sx={pageContainerSx}>
            <Container maxWidth="lg">
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', fontFamily: '"Tilt Prism", cursive' }}>
                    Shopping Cart
                </Typography>
                
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 1, overflow: 'hidden' }}>
                            {cart.map((item: ICartItem) => (
                                <CartItem 
                                    key={item._id}
                                    item={item}
                                    onIncrement={() => dispatch(Actions.incrementQuantity(item))}
                                    onDecrement={() => dispatch(Actions.decrementQuantity(item))}
                                    onRemove={() => dispatch(Actions.removeItem(item))}
                                />
                            ))}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CartPage;