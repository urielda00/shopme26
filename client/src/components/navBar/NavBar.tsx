import { FC, useState, useRef } from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Search from './Search';
import { UserToggle } from './UserToggle';
import ShoppingList from './ShoppingList';
import OpenCategories from './OpenCategories';
import OpenMenu from './OpenMenu';

const NavBar: FC = () => {
    const [hover, setHover] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setHover(true);
    };

    const handleMouseLeave = () => {
        // Set a 300ms delay before closing the menu
        timeoutRef.current = setTimeout(() => {
            setHover(false);
        }, 300); 
    };

    return (
        <AppBar 
            position="fixed"
            elevation={0}
            sx={{ 
                top: 0,
                width: '100%', 
                height: '80px', 
                bgcolor: 'rgba(10, 10, 10, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                zIndex: 1100
            }}
        >
            <Toolbar sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
                
                <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: '33%', md: '30%' } }}>
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <OpenMenu />
                    </Box>
                    
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
                        <NavLink 
                            to='/contact' 
                            style={({ isActive }) => ({ 
                                textDecoration: 'none', 
                                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)', 
                                letterSpacing: '2px', 
                                fontSize: '0.8rem', 
                                textTransform: 'uppercase', 
                                transition: 'color 0.3s ease' 
                            })}
                        >
                            Contact
                        </NavLink>
                        
                        <Box 
                            onMouseEnter={handleMouseEnter} 
                            onMouseLeave={handleMouseLeave} 
                            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', height: '80px' }}
                        >
                            <NavLink 
                                to='/productsList' 
                                style={({ isActive }) => ({ 
                                    textDecoration: 'none', 
                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.6)', 
                                    letterSpacing: '2px', 
                                    fontSize: '0.8rem', 
                                    textTransform: 'uppercase' 
                                })}
                            >
                                Shop
                            </NavLink>
                            <ArrowDropDownIcon sx={{ color: 'rgba(255,255,255,0.6)' }} />
                            <OpenCategories hover={hover} />
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: { xs: '33%', md: '40%' } }}>
                    <Typography component={Link} to="/" sx={{ 
                        fontSize: { xs: '1.1rem', md: '1.6rem' }, 
                        letterSpacing: { xs: '3px', md: '8px' },
                        color: '#fff', 
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 300
                    }}>
                        <StoreOutlinedIcon sx={{ mr: 1, opacity: 0.8, display: { xs: 'none', sm: 'block' } }} fontSize="medium" />
                        SHOPME
                    </Typography>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center', 
                    width: { xs: '33%', md: '30%' }, 
                    gap: { xs: 1, md: 3 } 
                }}>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Search />
                    </Box>
                    <UserToggle />
                    <ShoppingList />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;