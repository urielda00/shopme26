import { FC } from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
import { ICartItem } from '../../interfaces';

interface Props { cart: ICartItem[]; }

const CartStep: FC<Props> = ({ cart }) => {
    const backUrl = import.meta.env.VITE_BASE_BACK_URL;

    return (
        <Box sx={{ maxHeight: '400px', overflowY: 'auto', p: 1 }}>
            {cart.map((item) => (
                <Stack key={item._id} direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Box 
                        component="img" 
                        src={`${backUrl}/product/readProducts/${item.image}`}
                        sx={{ width: 60, height: 60, borderRadius: 2, objectFit: 'cover' }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" fontWeight="bold">{item.productName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.itemQuantity} x {item.price}$
                        </Typography>
                    </Box>
                    <Typography fontWeight="bold">{item.itemQuantity * item.price}$</Typography>
                </Stack>
            ))}
        </Box>
    );
};

export default CartStep;