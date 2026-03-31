import { FC } from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { ICartItem } from '../../interfaces/cart.interface';
import { cartItemSx, quantityStackSx, quantityBtnSx } from '../../pages/cart/Cart.styles';

interface Props {
    item: ICartItem;
    onIncrement: () => void; 
    onDecrement: () => void;
    onRemove: () => void;
}

const CartItem: FC<Props> = ({ item, onIncrement, onDecrement, onRemove }) => {
    const backUrl = import.meta.env.VITE_BASE_BACK_URL;
    const imageUrl = item.image ? `${backUrl}/product/readProducts/${item.image}` : '/placeholder.png';

    return (
        <Box sx={cartItemSx}>
            <Box 
                component="img"
                src={imageUrl}
                alt={item.productName}
                sx={{ 
                    width: { xs: 70, sm: 100 }, 
                    height: { xs: 70, sm: 100 }, 
                    borderRadius: { xs: 2, sm: 3 }, 
                    objectFit: 'cover', 
                    bgcolor: '#f5f5f7', // Updated background color for missing image
                    mr: { xs: 1.5, sm: 3 }, 
                    flexShrink: 0
                }}
            />
            
            {/* Added minWidth: 0 to prevent text from pushing the flex container out of bounds */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0, pr: 1 }}>
                <Typography 
                    variant="subtitle1" 
                    fontWeight="600" 
                    color="#1d1d1f" // Updated text color
                    sx={{ 
                        fontSize: { xs: '0.9rem', sm: '1.25rem' }, 
                        lineHeight: 1.2, 
                        mb: 0.5,
                        /* Truncate long text with ellipsis */
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {item.productName}
                </Typography>
                
                <Typography variant="body2" color="#86868b" fontWeight="500" sx={{ mb: 1.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                    ${item.price.toFixed(2)}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={0.5} sx={quantityStackSx}>
                    <IconButton 
                        size="small" 
                        onClick={onDecrement} 
                        disabled={item.itemQuantity <= 1} 
                        sx={{ ...quantityBtnSx, p: { xs: 0.3, sm: 0.8 } }}
                    >
                        <RemoveIcon sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }} />
                    </IconButton>
                    
                    <Typography fontWeight="500" sx={{ minWidth: { xs: 18, sm: 30 }, textAlign: 'center', color: '#1d1d1f', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                        {item.itemQuantity}
                    </Typography>
                    
                    <IconButton 
                        size="small" 
                        onClick={onIncrement} 
                        disabled={item.itemQuantity >= item.quantity}
                        sx={{ ...quantityBtnSx, p: { xs: 0.3, sm: 0.8 } }}
                    >
                        <AddIcon sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }} />
                    </IconButton>
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: { xs: '70px', sm: '100px' }, flexShrink: 0 }}>
                <IconButton 
                    onClick={onRemove} 
                    size="small"
                    sx={{ color: 'rgba(0,0,0,0.3)', p: 0, '&:hover': { color: '#d32f2f' } }} // Updated color and hover
                >
                    <CloseIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }} />
                </IconButton>

                <Typography fontWeight="600" sx={{ color: '#1d1d1f', fontSize: { xs: '0.95rem', sm: '1.25rem' }, mt: 'auto' }}>
                    ${(item.price * item.itemQuantity).toFixed(2)}
                </Typography>
            </Box>
        </Box>
    );
};

export default CartItem;