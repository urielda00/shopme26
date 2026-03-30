import { FC, useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment, List, ListItemButton, ListItemText, Box, ClickAwayListener, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'; 

const Search: FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const imgBaseUrl = import.meta.env.VITE_BASE_BACK_URL;

    const handleClose = () => setQuery('');

    useEffect(() => {
        const fetchData = async () => {
            if (query.length > 3) {
                try {
                    const res = await axiosInstance.get(`/product/searchProduct?key=${query}`);
                    setData(res.data);
                } catch (error) {
                    setData([]);
                }
            } else {
                setData([]);
            }
        };
        const timer = setTimeout(() => fetchData(), 300);
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box ref={containerRef} sx={{ position: 'relative', width: '200px' }}>
                <TextField
                    fullWidth
                    value={query}
                    type="search"
                    variant="standard"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem' }} />
                            </InputAdornment>
                        ),
                        disableUnderline: true,
                        sx: {
                            color: '#fff',
                            fontSize: '0.9rem',
                            borderBottom: '1px solid rgba(255,255,255,0.2)',
                            pb: 0.5,
                            transition: 'border-color 0.3s ease',
                            '&:hover': { borderBottom: '1px solid rgba(255,255,255,0.6)' },
                            '&.Mui-focused': { borderBottom: '1px solid #fff' }
                        }
                    }}
                />

                {data.length > 0 && query.length > 3 && (
                    <List sx={{
                        position: 'absolute',
                        top: '120%',
                        right: 0,
                        width: '300px',
                        bgcolor: 'rgba(20, 20, 20, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                        maxHeight: '350px',
                        overflow: 'auto',
                        zIndex: 1000,
                        borderRadius: '8px'
                    }}>
                        {data.map((product) => (
                            <ListItemButton key={product._id} component={Link} to={`/product/${product._id}`} onClick={handleClose} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
                                <Box component="img" src={`${imgBaseUrl}/searchProduct/${product.image}`} sx={{ width: 40, height: 40, objectFit: 'contain', mr: 2, borderRadius: '4px' }} />
                                <ListItemText 
                                    primary={<Typography sx={{ color: '#fff', fontSize: '0.9rem' }}>{product.shortDescription}</Typography>} 
                                    secondary={<Typography sx={{ color: '#aaa', fontSize: '0.8rem' }}>${product.price}</Typography>} 
                                />
                            </ListItemButton>
                        ))}
                    </List>
                )}
            </Box>
        </ClickAwayListener>
    );
};

export default Search;