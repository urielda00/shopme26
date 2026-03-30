import { FC } from 'react';
import { IconButton, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IGenerateLinksProps } from '../../interfaces'; 
import { checkoutBtnSx } from '../../pages/cart/Cart.styles';

const GenerateLinks: FC<IGenerateLinksProps> = ({ marginBottom, marginTop, src, width, height, content, icon, button }) => {
    return (
        <Box sx={{ mt: marginTop, mb: marginBottom }}>
            {icon && (
                <Link to='/productsList' style={{ color: 'black', textDecoration: 'none' }}>
                    <IconButton sx={{ color: 'black', typography: 'body2' }}>
                        <KeyboardReturnIcon sx={{ mr: 1 }} />
                        Back to shop
                    </IconButton>
                </Link>
            )}
            {button && (
                <Link to={`/${src}`} style={{ textDecoration: 'none' }}>
                    <Button
                        fullWidth
                        sx={{ 
                            ...checkoutBtnSx, 
                            width: width || '100%', 
                            height: height || '50px' 
                        }}
                    >
                        {content}
                    </Button>
                </Link>
            )}
        </Box>
    );
};

export default GenerateLinks;