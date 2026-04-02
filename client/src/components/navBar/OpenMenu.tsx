import { FC, useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearAuthUser } from '../../features/userSlice';
import { resetOnLogOut } from '../../features/cartSlice';
import { logoutAPI } from '../../services/authService';

const OpenMenu: FC = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isAdmin } = useAppSelector((state) => state.user);

    const toggleDrawer = (state: boolean) => () => setOpen(state);

    const handleLogout = async () => {
        try {
            await logoutAPI();
        } catch (error) {
            // Intentionally ignored to allow client cleanup
        } finally {
            dispatch(clearAuthUser());
            dispatch(resetOnLogOut());
            setOpen(false);
            navigate('/login');
        }
    };

    const listItemStyles = {
        color: '#111827',
        py: 2,
        '& span': { fontWeight: 300, letterSpacing: '2px', fontSize: '1rem' },
        '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' },
    };

    const drawerContent = (
        <Box
            sx={{
                width: 280,
                height: '100%',
                bgcolor: 'rgba(255,255,255,0.78)',
                backdropFilter: 'blur(22px) saturate(150%)',
                WebkitBackdropFilter: 'blur(22px) saturate(150%)',
                borderRight: '1px solid rgba(255,255,255,0.38)',
                p: 3,
            }}
            role='presentation'
        >
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 6 }}>
                <IconButton onClick={toggleDrawer(false)} sx={{ color: '#111827', p: 0 }}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Box>

            <List sx={{ mt: 2 }}>
                {[
                    { text: 'HOME', to: '/' },
                    { text: 'SHOP', to: '/productsList' },
                    { text: 'CONTACT', to: '/contact' },
                    ...(isAdmin ? [{ text: 'DASHBOARD', to: '/admin/dashboard' }] : []),
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            sx={listItemStyles}
                            component={Link}
                            to={item.to}
                            onClick={toggleDrawer(false)}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}

                <Divider sx={{ my: 3, borderColor: 'rgba(17,24,39,0.08)' }} />

                {user ? (
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout} sx={{ ...listItemStyles, color: '#7c3aed' }}>
                            <ListItemText primary='LOG OUT' />
                        </ListItemButton>
                    </ListItem>
                ) : (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={listItemStyles}
                                component={Link}
                                to='/login'
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary='LOGIN' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={listItemStyles}
                                component={Link}
                                to='/register'
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText primary='REGISTER' />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <>
            <IconButton onClick={toggleDrawer(true)} sx={{ color: '#111827', p: 0 }}>
                <MenuIcon />
            </IconButton>

            <Drawer
                anchor='left'
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        background: 'transparent',
                        boxShadow: 'none',
                        borderRight: 'none',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default OpenMenu;