import { Box } from '@mui/material';
import UpdateCreate from '../../components/admin/UpdateCreate';

const Update = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background:
                    'radial-gradient(circle at top, rgba(99,102,241,0.08), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
            }}
        >
            <UpdateCreate isUpdate={true} isCreate={false} />
        </Box>
    );
};

export default Update;