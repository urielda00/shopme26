import { FC, useState } from 'react';
import { Box, Typography, Divider, TextField, Paper, Button } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import GenerateLinks from '../common/GenerateLinks';
import MuiDialog from './MuiDialog';

interface Props {
    totalPrice: number;
    totalQuantity: number;
}

const CartSummary: FC<Props> = ({ totalPrice, totalQuantity }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { user } = useAppSelector((state) => state.user);
    const { cart } = useAppSelector((state) => state.cart);

    // Handle checkout click when cart logic might require validation
    const handleEmptyCheckout = () => {
        setDialogOpen(true);
        setTimeout(() => setDialogOpen(false), 2000);
    };

    return (
        <Paper elevation={0} sx={{ p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Summary
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Total Items:</Typography>
                <Typography fontWeight="500">{totalQuantity}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>COUPON CODE:</Typography>
                <TextField 
                    fullWidth 
                    variant="filled" 
                    label="Enter Your Code" 
                    size="small"
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">TOTAL PRICE</Typography>
                <Typography variant="h6" color="primary.main">{totalPrice} $</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <MuiDialog open={dialogOpen} />
                
                {cart.length < 1 ? (
                    <Button 
                        fullWidth 
                        variant="contained" 
                        onClick={handleEmptyCheckout}
                        sx={{ 
                            bgcolor: 'var(--cartBtnDarkGrey)', 
                            height: '50px',
                            '&:hover': { bgcolor: 'var(--black)' } 
                        }}
                    >
                        Checkout
                    </Button>
                ) : (
                    <GenerateLinks 
                        height="50px" 
                        width="100%" 
                        icon={false} 
                        button={true} 
                        src="checkout" 
                        content="Checkout" 
                    />
                )}

                {/* Show Register link only if user is not logged in */}
                {!user && (
                    <GenerateLinks 
                        height="50px" 
                        width="100%" 
                        icon={false} 
                        button={true} 
                        src="register" 
                        content="Register" 
                    />
                )}
            </Box>
        </Paper>
    );
};

export default CartSummary;