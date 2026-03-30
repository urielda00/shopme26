import { FC } from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { ICartItem } from '../../interfaces/cart.interface';

interface Props {
    item: ICartItem;
    onIncrement: (id: string) => void;
    onDecrement: (id: string) => void;
    onRemove: (id: string) => void;
}

const CartItem: FC<Props> = ({ item, onIncrement, onDecrement, onRemove }) => {
    // Get base URL from environment variables
    const backUrl = import.meta.env.VITE_BASE_BACK_URL;

    return (
        <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            alignItems="center" 
            sx={{ p: 2, borderBottom: '1px solid #eee' }}
        >
            <Box 
                component="img"
                src={`${backUrl}/product/readProducts/${item.image}`}
                sx={{ width: 80, height: 80, borderRadius: 1, objectFit: 'cover' }}
            />
            
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="600">{item.productName}</Typography>
                <Typography variant="body2" color="text.secondary">{item.price}$</Typography>
            </Box>

            <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton size="small" onClick={() => onDecrement(item._id)}><RemoveIcon /></IconButton>
                <Typography>{item.itemQuantity}</Typography>
                <IconButton size="small" onClick={() => onIncrement(item._id)}><AddIcon /></IconButton>
            </Stack>

            <Typography fontWeight="bold" sx={{ minWidth: 60, textAlign: 'right' }}>
                {item.price * item.itemQuantity}$
            </Typography>

            <IconButton color="error" onClick={() => onRemove(item._id)}><CloseIcon /></IconButton>
        </Stack>
    );
};

export default CartItem;