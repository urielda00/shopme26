import { SxProps, Theme } from '@mui/material';
import backGround from '../../assets/contactBackground.jpg';

export const contactPageWrapperSx: SxProps<Theme> = {
    height: '88vh'
};

export const imageGridSx: SxProps<Theme> = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${backGround})`,
    display: { xs: 'none', sm: 'block' }
};

export const formContainerSx: SxProps<Theme> = {
    my: 8,
    mx: 4,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
};