import { FC } from 'react';
import { Box } from '@mui/material';
import ForgotPassForm from '../components/forgotReset/ForgotPassForm';

const ForgotPassPage: FC = () => {
	return (
		<Box
			sx={{
				width: '100%',
				minHeight: 'calc(100vh - 80px)',
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'center',
				pt: { xs: '96px', md: '118px' },
				pb: { xs: 4, md: 6 },
				px: 2,
				background:
					'radial-gradient(circle at top, rgba(255,255,255,0.9) 0%, rgba(238,242,248,0.96) 42%, rgba(228,234,241,1) 100%)',
				overflow: 'hidden',
			}}
		>
			<ForgotPassForm />
		</Box>
	);
};

export default ForgotPassPage;