import { FC } from 'react';
import { Container, Typography, Box, Button, BoxProps } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import { motion, Variants, MotionProps } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { updateQuantityThunk, removeItemThunk } from '../../features/cartSlice';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import { ICartItem } from '../../interfaces';
import { pageContainerSx, cartContentWrapperSx, checkoutBtnSx } from './Cart.styles';

// Merge MUI BoxProps with Framer MotionProps
const MotionBox = motion(Box) as React.FC<BoxProps & MotionProps>;

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, duration: 0.5 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

const CartPage: FC = () => {
    let { items, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const useMockData = true;

    // Mock data for UI testing
    if (useMockData) {
        items = [
            {
                _id: '1',
                productName: 'Premium Wireless Headphones',
                price: 299.99,
                quantity: 10,
                itemQuantity: 1,
                category: 'Audio',
                image: ''
            },
            {
                _id: '2',
                productName: 'Minimalist Smartwatch',
                price: 450.0,
                quantity: 5,
                itemQuantity: 2,
                category: 'Wearables',
                image: ''
            },
            {
                _id: '3',
                productName: 'Minimalist Smartwatch',
                price: 450.0,
                quantity: 5,
                itemQuantity: 2,
                category: 'Wearables',
                image: ''
            },
            {
                _id: '4',
                productName: 'Minimalist Smartwatch',
                price: 450.0,
                quantity: 5,
                itemQuantity: 2,
                category: 'Wearables',
                image: ''
            },
            {
                _id: '5',
                productName: 'Minimalist Smartwatch',
                price: 450.0,
                quantity: 5,
                itemQuantity: 2,
                category: 'Wearables',
                image: ''
            }
        ];
        totalPrice = 1199.99;
        totalQuantity = 3;
    }

    // Layout wrapper
    const renderCartWrapper = (children: React.ReactNode) => (
        <Box sx={pageContainerSx}>
            <Container maxWidth="lg">
                <MotionBox
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    sx={cartContentWrapperSx}
                >
                    {children}
                </MotionBox>
            </Container>
        </Box>
    );

    // Empty cart state
    if (items.length === 0) {
        return renderCartWrapper(
            <MotionBox
                variants={itemVariants}
                sx={{
                    py: 12,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4
                }}
            >
                <Typography variant="h5" color="#86868B" sx={{ fontWeight: 400 }}>
                    Your cart is empty.
                </Typography>

                <Button component={Link} to="/productsList" sx={{ ...checkoutBtnSx, px: 6 }}>
                    Discover Products
                </Button>
            </MotionBox>
        );
    }

    // Main layout
    return renderCartWrapper(
        <Grid container spacing={5} alignItems="flex-start">
            {/* Left side: title + items */}
            <Grid
                size={{ xs: 12, md: 8 }}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0 // Required for internal scrolling
                }}
            >
                <MotionBox variants={itemVariants}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            letterSpacing: '-0.5px',
                            color: '#1d1d1f',
                            fontSize: { xs: '1.75rem', md: '3rem' },
                            textAlign: { xs: 'center', md: 'left' },
                            mb: { xs: 3, md: 4 }
                        }}
                    >
                        Your Cart
                    </Typography>
                </MotionBox>

                {/* Scrollable items container */}
                <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        maxHeight: { xs: 'unset', lg: 'calc(100vh - 260px)' },
        overflowY: { xs: 'unset', lg: 'auto' },
        pr: { xs: 0, lg: 2 },

        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '10px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255, 255, 255, 0.3)'
        }
    }}
>
                    {items.map((item: ICartItem) => (
                        <MotionBox key={item._id} variants={itemVariants}>
                            <CartItem
                                item={item}
                                onIncrement={() =>
                                    dispatch(
                                        updateQuantityThunk({
                                            productId: item._id,
                                            action: 'inc',
                                            price: item.price
                                        })
                                    )
                                }
                                onDecrement={() =>
                                    dispatch(
                                        updateQuantityThunk({
                                            productId: item._id,
                                            action: 'dec',
                                            price: item.price
                                        })
                                    )
                                }
                                onRemove={() => dispatch(removeItemThunk(item))}
                            />
                        </MotionBox>
                    ))}
                </Box>
            </Grid>

            {/* Right side: summary */}
            <Grid size={{ xs: 12, md: 4 }}>
                <MotionBox variants={itemVariants}>
                    <CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
                </MotionBox>
            </Grid>
        </Grid>
    );
};

export default CartPage;