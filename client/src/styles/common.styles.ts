import { SystemStyleObject } from '@mui/system';
import { Theme } from '@mui/material';

/**
 * Using SystemStyleObject instead of SxProps to avoid array nesting issues
 */
export const commonContainerSx: SystemStyleObject<Theme> = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--width)',
    height: { 
        md: '88vh', 
        sm: '88vh', 
        xs: '90vh' 
    },
};