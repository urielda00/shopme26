import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Box } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAppSelector } from '../../app/hooks';

const ShoppingList: FC = () => {
    const { totalQuantity } = useAppSelector((state) => state.cart);

    return (
        <Box component={Link} to="/cart" sx={{ position: 'relative', display: 'flex', textDecoration: 'none' }}>
            <IconButton sx={{ color: '#fff' }}>
                <ShoppingCartOutlinedIcon fontSize="small" />
            </IconButton>

            {totalQuantity > 0 && (
                <Box component="span" sx={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    color: '#000',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 10px rgba(255,255,255,0.3)'
                }}>
                    {totalQuantity}
                </Box>
            )}
        </Box>
    );
};

export default ShoppingList;