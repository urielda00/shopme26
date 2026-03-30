import { FC } from 'react';
import { IconButton, Button, Box, SxProps, Theme } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

interface IGenerateLinksProps {
    src: string;
    content?: string;
    width?: string | object;
    height?: string;
    marginTop?: number;
    marginBottom?: number;
    icon?: boolean;
    button?: boolean;
    sx?: SxProps<Theme>; // Allow custom style overrides
}

const GenerateLinks: FC<IGenerateLinksProps> = ({ 
    marginBottom, 
    marginTop, 
    src, 
    width = '100%', 
    height = '50px', 
    content, 
    icon, 
    button,
    sx 
}) => {
    return (
        <Box sx={{ mt: marginTop, mb: marginBottom }}>
            {icon && (
                <IconButton 
                    component={Link} 
                    to="/productsList" 
                    sx={{ color: 'black', typography: 'body2', '&:hover': { bgcolor: 'transparent', opacity: 0.7 } }}
                >
                    <KeyboardReturnIcon sx={{ mr: 1 }} />
                    Back to shop
                </IconButton>
            )}

            {button && (
                <Button
                    component={Link}
                    to={`/${src}`}
                    fullWidth
                    sx={[
                        {
                            height,
                            width,
                            color: 'var(--white)',
                            bgcolor: 'var(--cartBtnDarkGrey)',
                            '&:hover': { bgcolor: 'var(--black)' },
                            textTransform: 'none',
                            fontWeight: 'bold'
                        },
                        ...(Array.isArray(sx) ? sx : [sx]) // Merges custom sx if provided
                    ]}
                >
                    {content}
                </Button>
            )}
        </Box>
    );
};

export default GenerateLinks;