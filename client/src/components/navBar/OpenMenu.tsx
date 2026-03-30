import { FC, useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, IconButton, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loggedOut } from '../../features/userSlice';
import { resetOnLogOut } from '../../features/cartSlice';

const OpenMenu: FC = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);

    const toggleDrawer = (state: boolean) => () => setOpen(state);

    const handleLogout = () => {
        dispatch(loggedOut());
        dispatch(resetOnLogOut());
        setOpen(false);
    };

    const listItemStyles = {
        color: '#fff',
        py: 2,
        '& span': { fontWeight: 300, letterSpacing: '2px', fontSize: '1rem' },
        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
    };

    const drawerContent = (
        <Box sx={{ width: 280, height: '100%', bgcolor: '#0a0a0a', p: 3 }} role="presentation">
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 6 }}>
                <IconButton onClick={toggleDrawer(false)} sx={{ color: '#fff', p: 0 }}>
                    <CloseOutlinedIcon />
                </IconButton>
            </Box>
            
            <List sx={{ mt: 2 }}>
                {[
                    { text: 'HOME', to: '/' },
                    { text: 'SHOP', to: '/productsList' },
                    { text: 'CONTACT', to: '/contact' }
                ].map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton sx={listItemStyles} component={Link} to={item.to} onClick={toggleDrawer(false)}>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                
                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
                
                {user ? (
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout} sx={{ ...listItemStyles, color: '#ff4d4d' }}>
                            <ListItemText primary="LOG OUT" />
                        </ListItemButton>
                    </ListItem>
                ) : (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton sx={listItemStyles} component={Link} to="/login" onClick={toggleDrawer(false)}>
                                <ListItemText primary="LOGIN" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={listItemStyles} component={Link} to="/register" onClick={toggleDrawer(false)}>
                                <ListItemText primary="REGISTER" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    return (
        <>
            <IconButton onClick={toggleDrawer(true)} sx={{ color: '#fff', p: 0 }}>
                <MenuIcon />
            </IconButton>
            <Drawer 
                anchor="left" 
                open={open} 
                onClose={toggleDrawer(false)}
                PaperProps={{ sx: { borderRight: '1px solid rgba(255,255,255,0.1)' } }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default OpenMenu;