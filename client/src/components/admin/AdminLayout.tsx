import { ReactNode, useMemo } from 'react';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Stack,
    Typography,
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface AdminLayoutProps {
    title: string;
    subtitle: string;
    primaryAction?: {
        label: string;
        to: string;
    };
    children: ReactNode;
}

const navigationItems = [
    {
        label: 'Overview',
        to: '/admin/dashboard',
        icon: <DashboardRoundedIcon fontSize="small" />,
    },
    {
        label: 'Products',
        to: '/admin/products',
        icon: <Inventory2RoundedIcon fontSize="small" />,
    },
    {
        label: 'Users',
        to: '/admin/users',
        icon: <PeopleAltRoundedIcon fontSize="small" />,
    },
    {
        label: 'Orders',
        to: '/admin/orders',
        icon: <ReceiptLongRoundedIcon fontSize="small" />,
    },
    {
        label: 'Invoices',
        to: '/admin/invoices',
        icon: <DescriptionRoundedIcon fontSize="small" />,
    },
];

const NAVBAR_HEIGHT = 80;

const AdminLayout = ({ title, subtitle, primaryAction, children }: AdminLayoutProps) => {
    const location = useLocation();
    const userName = useSelector((state: RootState) => state.user.userName);

    const activeItem = useMemo(
        () => navigationItems.find((item) => location.pathname.startsWith(item.to)),
        [location.pathname]
    );

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background:
                    'radial-gradient(circle at top left, rgba(99,102,241,0.14), transparent 28%), linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
                pt: `${NAVBAR_HEIGHT}px`,
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '300px minmax(0, 1fr)' },
                    minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
                }}
            >
                <Box
                    sx={{
                        position: { lg: 'sticky' },
                        top: { lg: `${NAVBAR_HEIGHT}px` },
                        height: { lg: `calc(100vh - ${NAVBAR_HEIGHT}px)` },
                        borderRight: '1px solid rgba(148,163,184,0.14)',
                        background: 'rgba(255,255,255,0.68)',
                        backdropFilter: 'blur(16px)',
                        px: 3,
                        py: 4,
                    }}
                >
                    <Stack spacing={3} sx={{ height: '100%' }}>
                        <Box>
                            <Typography
                                variant="overline"
                                sx={{
                                    color: 'rgba(17,24,39,0.56)',
                                    letterSpacing: '0.28rem',
                                }}
                            >
                                ADMIN CONTROL
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    mt: 1,
                                    color: '#111827',
                                    fontWeight: 300,
                                    letterSpacing: '-0.04em',
                                }}
                            >
                                Workspace
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                p: 2,
                                borderRadius: '24px',
                                background:
                                    'linear-gradient(135deg, rgba(79,70,229,0.96) 0%, rgba(124,58,237,0.92) 100%)',
                                color: '#fff',
                                boxShadow: '0 28px 48px rgba(79,70,229,0.24)',
                            }}
                        >
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.16)' }}>
                                    {userName?.[0]?.toUpperCase() || 'A'}
                                </Avatar>
                                <Box>
                                    <Typography sx={{ fontWeight: 600 }}>Admin session</Typography>
                                    <Typography sx={{ fontSize: '0.88rem', opacity: 0.82 }}>
                                        {userName || 'Administrator'}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>

                        <Stack spacing={1}>
                            {navigationItems.map((item) => {
                                const isActive =
                                    location.pathname === item.to ||
                                    location.pathname.startsWith(`${item.to}/`);

                                return (
                                    <Button
                                        key={item.to}
                                        component={Link}
                                        to={item.to}
                                        startIcon={item.icon}
                                        sx={{
                                            justifyContent: 'flex-start',
                                            minHeight: '50px',
                                            px: 2,
                                            borderRadius: '16px',
                                            textTransform: 'none',
                                            fontSize: '0.96rem',
                                            color: isActive ? '#111827' : 'rgba(17,24,39,0.72)',
                                            background: isActive
                                                ? 'rgba(99,102,241,0.10)'
                                                : 'transparent',
                                            border: isActive
                                                ? '1px solid rgba(99,102,241,0.16)'
                                                : '1px solid transparent',
                                            '&:hover': {
                                                background: 'rgba(99,102,241,0.08)',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                );
                            })}
                        </Stack>

                        <Divider />

                        <Box sx={{ mt: 'auto' }}>
                            <Typography sx={{ color: 'rgba(17,24,39,0.52)', fontSize: '0.88rem', mb: 1 }}>
                                Current section
                            </Typography>
                            <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                {activeItem?.label || 'Overview'}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <Box
                    sx={{
                        px: { xs: 2, sm: 3, lg: 4 },
                        py: { xs: 3, lg: 5 },
                    }}
                >
                    <Box
                        sx={{
                            mb: 3,
                            display: 'flex',
                            alignItems: { xs: 'flex-start', md: 'center' },
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: '#111827',
                                    fontWeight: 300,
                                    letterSpacing: '-0.04em',
                                    mb: 1,
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography sx={{ color: 'rgba(17,24,39,0.68)', maxWidth: 720, lineHeight: 1.8 }}>
                                {subtitle}
                            </Typography>
                        </Box>

                        {primaryAction ? (
                            <Button
                                component={Link}
                                to={primaryAction.to}
                                variant="contained"
                                startIcon={<AddRoundedIcon />}
                                sx={{
                                    minHeight: '52px',
                                    px: 2.5,
                                    borderRadius: '16px',
                                    textTransform: 'none',
                                    fontSize: '0.96rem',
                                    fontWeight: 500,
                                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                    boxShadow: '0 20px 40px rgba(79,70,229,0.22)',
                                    '&:hover': {
                                        boxShadow: '0 24px 44px rgba(79,70,229,0.28)',
                                    },
                                }}
                            >
                                {primaryAction.label}
                            </Button>
                        ) : null}
                    </Box>

                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;