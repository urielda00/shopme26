import { FC, useState } from 'react';
import { Box, Typography, Divider, TextField, Paper, Button, SxProps, Theme } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import GenerateLinks from '../common/GenerateLinks';
import MuiDialog from './MuiDialog';
import { summaryPaperSx, checkoutBtnSx, registerBtnSx, summaryTextFieldSx } from '../../pages/cart/Cart.styles';

interface Props {
    totalPrice: number;
    totalQuantity: number;
}

const CartSummary: FC<Props> = ({ totalPrice, totalQuantity }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { user } = useAppSelector((state) => state.user);
    const { items } = useAppSelector((state) => state.cart);

    const handleEmptyCheckout = () => {
        setDialogOpen(true);
        setTimeout(() => setDialogOpen(false), 2000);
    };

    return (
        <Paper elevation={0} sx={summaryPaperSx}>
            <Typography 
                variant="h5" 
                sx={{ 
                    mb: 4, 
                    fontWeight: 600, 
                    color: '#1d1d1f', // Updated text color
                    letterSpacing: '-0.5px',
                    // Responsive size: smaller on mobile
                    fontSize: { xs: '1.25rem', md: '1.5rem' } 
                }}
            >
                Summary
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ color: '#86868b', fontSize: { xs: '0.9rem', md: '1rem' } }}>Total Items</Typography>
                <Typography fontWeight="500" color="#1d1d1f" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>{totalQuantity}</Typography>
            </Box>

            <Divider sx={{ my: 3, borderColor: 'rgba(0,0,0,0.08)' }} />

            <Box sx={{ mb: 4 }}>
                <Typography variant="caption" sx={{ mb: 1.5, display: 'block', color: '#86868b', fontWeight: 500 }}>PROMO CODE</Typography>
                <TextField 
                    fullWidth 
                    variant="outlined" 
                    placeholder="Enter code" 
                    size="small"
                    sx={{
                        ...summaryTextFieldSx,
                        // Making the input text slightly smaller on mobile
                        '& .MuiInputBase-input': { fontSize: { xs: '0.9rem', md: '1rem' } }
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="body2" sx={{ color: '#86868b', fontWeight: 500, fontSize: { xs: '0.85rem', md: '0.875rem' } }}>Total</Typography>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        color: '#1d1d1f', // Updated text color
                        fontWeight: 600, 
                        letterSpacing: '-1px',
                        // Responsive size for the total price: smaller on mobile
                        fontSize: { xs: '1.5rem', md: '2.125rem' } 
                    }}
                >
                    ${totalPrice.toFixed(2)}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <MuiDialog open={dialogOpen} />
                
                {items.length < 1 ? (
                    <Button 
                        fullWidth 
                        onClick={handleEmptyCheckout}
                        sx={checkoutBtnSx} 
                    >
                        Checkout
                    </Button>
                ) : (
                    <Box sx={{ '& a, & button': checkoutBtnSx, display: 'block', width: '100%' } as SxProps<Theme>}>
                        <GenerateLinks 
                            height="46px" 
                            width="100%" 
                            icon={false} 
                            button={true} 
                            src="checkout" 
                            content="Checkout" 
                        />
                    </Box>
                )}

                {!user && (
                    <Box sx={{ '& a, & button': registerBtnSx, display: 'block', width: '100%' } as SxProps<Theme>}>
                        <GenerateLinks 
                            height="46px" 
                            width="100%" 
                            icon={false} 
                            button={true} 
                            src="register" 
                            content="Create Account" 
                        />
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default CartSummary;