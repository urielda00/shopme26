import { Box } from '@mui/material';
import UpdateCreate from '../../components/admin/UpdateCreate';

const CreateItem = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                pt: '80px',
                background:
                    'radial-gradient(circle at top, rgba(99,102,241,0.08), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
            }}
        >
            <UpdateCreate isUpdate={false} isCreate={true} />
        </Box>
    );
};

export default CreateItem;