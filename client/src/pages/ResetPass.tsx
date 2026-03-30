import { FC } from 'react';
import { Box } from '@mui/material';
import { commonContainerSx } from '../styles/common.styles';
import ResetForm from '../components/forgotReset/ResetForm';

const ResetPassPage: FC = () => {
    return (
        <Box sx={[commonContainerSx, { bgcolor: 'var(--containerWhiteBackground)' }]}>
            <ResetForm />
        </Box>
    );
};

export default ResetPassPage;