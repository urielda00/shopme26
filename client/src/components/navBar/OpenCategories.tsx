import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const categoriesList = [
    { name: 'Mobiles', category: 'phone' },
    { name: 'Laptops', category: 'laptops' },
    { name: 'Watches', category: 'watches' },
    { name: 'Tablets', category: 'tablets' },
    { name: 'HeadPhones', category: 'headphones' },
    { name: 'PC', category: 'pc' },
];

const shopList = [
    { name: 'Shop All', link: '/productsList' },
    { name: 'New In', link: '/productsList' },
    { name: 'Best Offers', link: '/productsList' },
    { name: '2023 Items', link: '/productsList' },
    { name: '2022 Items', link: '/productsList' },
];

const supportList = [
    { name: 'My account', link: '/underConstruction' },
    { name: 'FAQ', link: '/underConstruction' },
    { name: 'Terms', link: '/underConstruction' },
    { name: 'Privacy Policy', link: '/underConstruction' },
];

interface Props {
    hover: boolean;
}

const OpenCategories: FC<Props> = ({ hover }) => {
    return (
        <Box sx={{
            position: 'fixed',
            top: '80px', 
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            padding: '40px',
            borderRadius: '0 0 16px 16px',
            backgroundColor: 'rgba(15, 15, 15, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderTop: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
            opacity: hover ? 1 : 0,
            visibility: hover ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease'
        }}>
            {[
                { title: 'CATEGORIES', items: categoriesList, isQuery: true },
                { title: 'SHOP', items: shopList, isQuery: false },
                { title: 'SUPPORT', items: supportList, isQuery: false }
            ].map((col, idx) => (
                <Box key={idx} sx={{ width: '30%' }}>
                    <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', display: 'block', mb: 3 }}>
                        {col.title}
                    </Typography>
                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                        {col.items.map((item: any, index) => (
                            <Box component="li" key={index} sx={{ mb: 1.5 }}>
                                <Link 
                                    to={col.isQuery ? `/productsList?toCategory=${item.category}` : item.link} 
                                    style={{ 
                                        color: '#fff', 
                                        textDecoration: 'none', 
                                        fontSize: '0.95rem',
                                        fontWeight: 300,
                                        transition: 'color 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#aaa'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                                >
                                    {item.name}
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default OpenCategories;