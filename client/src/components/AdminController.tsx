import { FC } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

// Icons
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const actions = [
    { icon: <Link to={'/createItem'} style={{ display: 'flex', color: 'inherit' }}><NoteAddIcon /></Link>, name: 'New Item' },
    { icon: <Link to={'/updateItem'} style={{ display: 'flex', color: 'inherit' }}><AutorenewIcon /></Link>, name: 'Update Item' },
    { icon: <Link to={'/deleteItem'} style={{ display: 'flex', color: 'inherit' }}><DeleteOutlineIcon /></Link>, name: 'Delete Item' },
];

const AdminController: FC = () => {
    const { isAdmin } = useAppSelector((state) => state.user);
    const isLogged = window.sessionStorage.getItem('isLogged');

    if (!isAdmin || isLogged !== 'true') return null;

    return (
        <Box>
            <SpeedDial 
                ariaLabel="Admin Controller" 
                icon={<SpeedDialIcon />}
                sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
            >
                {actions.map((action) => (
                    <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
                ))}
            </SpeedDial>
        </Box>
    );
};

export default AdminController;