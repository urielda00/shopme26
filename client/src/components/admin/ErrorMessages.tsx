import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface ErrorMessagesProps {
    error?: string;
}

const ErrorMessages = ({ error }: ErrorMessagesProps) => {
    if (!error) return null;

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert
                severity='error'
                sx={{
                    width: '100%',
                    borderRadius: '16px',
                    alignItems: 'center',
                    boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
                }}
            >
                {error}
            </Alert>
        </Stack>
    );
};

export default ErrorMessages;