import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';

import { IUserOrder, IUserProfile } from '../../services/userDashboardService';
import { ProfileFormState, PasswordFormState } from '../../hooks/useUserDashboard';
import ChangePasswordCard from './ChangePasswordCard';

const glassCardSx = {
    borderRadius: 4,
    border: '1px solid rgba(255,255,255,0.45)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.66) 100%)',
    backdropFilter: 'blur(18px) saturate(160%)',
    WebkitBackdropFilter: 'blur(18px) saturate(160%)',
    boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
};

const statCardSx = {
    ...glassCardSx,
    height: '100%',
    minHeight: 146,
};

const sectionTitleSx = {
    fontSize: { xs: '1rem', md: '1.1rem' },
    fontWeight: 500,
    color: '#111827',
    mb: 2,
};

const inputSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.58)',
    },
};

interface UserDashboardViewProps {
    profile: IUserProfile | null;
    orders: IUserOrder[];
    loading: boolean;

    infoLoading: boolean;
    passwordLoading: boolean;

    infoSuccess: string;
    infoError: string;
    passwordSuccess: string;
    passwordError: string;

    profileForm: ProfileFormState;
    passwordForm: PasswordFormState;

    totalSpent: number;
    latestOrderDate: string;
    totalProductsOrdered: number;

    onProfileChange: (field: keyof ProfileFormState, value: string) => void;
    onPasswordChange: (field: keyof PasswordFormState, value: string) => void;
    onSaveProfile: () => void;
    onSavePassword: () => void;
}

const UserDashboardView = ({
    profile,
    orders,
    loading,
    infoLoading,
    passwordLoading,
    infoSuccess,
    infoError,
    passwordSuccess,
    passwordError,
    profileForm,
    passwordForm,
    totalSpent,
    latestOrderDate,
    totalProductsOrdered,
    onProfileChange,
    onPasswordChange,
    onSaveProfile,
    onSavePassword,
}: UserDashboardViewProps) => {
    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                    pt: '100px',
                    background:
                        'radial-gradient(circle at top, rgba(99,102,241,0.10), transparent 28%), #f8fafc',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                pt: '120px',
                pb: 8,
                background:
                    'radial-gradient(circle at top, rgba(99,102,241,0.10), transparent 28%), #f8fafc',
            }}
        >
            <Container maxWidth={false} sx={{ px: { xs: 2, md: 4, lg: 5 } }}>
                <Stack spacing={3}>
                    <Box sx={{ maxWidth: 900 }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' },
                                fontWeight: 300,
                                color: '#111827',
                                letterSpacing: { xs: '2px', md: '6px' },
                                textTransform: 'uppercase',
                            }}
                        >
                            My Account
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                color: 'rgba(17,24,39,0.68)',
                                fontSize: { xs: '1rem', md: '1.05rem' },
                                lineHeight: 1.6,
                                maxWidth: 760,
                            }}
                        >
                            Manage your account details, review recent orders, and keep your profile updated from one clean dashboard.
                        </Typography>
                    </Box>

                    {(infoError || infoSuccess) && (
                        <Stack spacing={1}>
                            {infoError ? <Alert severity="error">{infoError}</Alert> : null}
                            {infoSuccess ? <Alert severity="success">{infoSuccess}</Alert> : null}
                        </Stack>
                    )}

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, minmax(0, 1fr))',
                                lg: 'repeat(4, minmax(0, 1fr))',
                            },
                            gap: 2,
                            width: '100%',
                        }}
                    >
                        <Card sx={statCardSx}>
                            <CardContent sx={{ height: '100%' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                                    <Box>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.62)', fontSize: '0.92rem' }}>
                                            Orders
                                        </Typography>
                                        <Typography sx={{ fontSize: '2rem', color: '#111827', fontWeight: 500 }}>
                                            {orders.length}
                                        </Typography>
                                    </Box>
                                    <ShoppingBagOutlinedIcon sx={{ color: '#4f46e5', fontSize: 30 }} />
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card sx={statCardSx}>
                            <CardContent sx={{ height: '100%' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                                    <Box>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.62)', fontSize: '0.92rem' }}>
                                            Total Spent
                                        </Typography>
                                        <Typography sx={{ fontSize: '2rem', color: '#111827', fontWeight: 500 }}>
                                            ${totalSpent.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <PaidOutlinedIcon sx={{ color: '#4f46e5', fontSize: 30 }} />
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card sx={statCardSx}>
                            <CardContent sx={{ height: '100%' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                                    <Box>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.62)', fontSize: '0.92rem' }}>
                                            Items Ordered
                                        </Typography>
                                        <Typography sx={{ fontSize: '2rem', color: '#111827', fontWeight: 500 }}>
                                            {totalProductsOrdered}
                                        </Typography>
                                    </Box>
                                    <PersonOutlineRoundedIcon sx={{ color: '#4f46e5', fontSize: 30 }} />
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card sx={statCardSx}>
                            <CardContent sx={{ height: '100%' }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '100%' }}>
                                    <Box>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.62)', fontSize: '0.92rem' }}>
                                            Latest Order
                                        </Typography>
                                        <Typography sx={{ fontSize: '1.45rem', color: '#111827', fontWeight: 500 }}>
                                            {latestOrderDate}
                                        </Typography>
                                    </Box>
                                    <EventOutlinedIcon sx={{ color: '#4f46e5', fontSize: 30 }} />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                xl: 'minmax(0, 1.5fr) minmax(380px, 0.9fr)',
                            },
                            gap: 3,
                            alignItems: 'start',
                            width: '100%',
                        }}
                    >
                        <Card sx={glassCardSx}>
                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                <Typography sx={sectionTitleSx}>Order History</Typography>

                                {!orders.length ? (
                                    <Box
                                        sx={{
                                            borderRadius: 3,
                                            p: 3,
                                            border: '1px dashed rgba(17,24,39,0.15)',
                                            background: 'rgba(255,255,255,0.4)',
                                        }}
                                    >
                                        <Typography sx={{ color: 'rgba(17,24,39,0.68)' }}>
                                            No orders yet. Once you place your first order, it will appear here.
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Stack spacing={2}>
                                        {orders.map((order) => (
                                            <Box
                                                key={order._id}
                                                sx={{
                                                    borderRadius: 3,
                                                    p: 2.2,
                                                    border: '1px solid rgba(17,24,39,0.08)',
                                                    background: 'rgba(255,255,255,0.52)',
                                                }}
                                            >
                                                <Stack
                                                    direction={{ xs: 'column', sm: 'row' }}
                                                    justifyContent="space-between"
                                                    spacing={1.5}
                                                >
                                                    <Box>
                                                        <Typography sx={{ fontWeight: 700, color: '#111827', fontSize: '1.1rem' }}>
                                                            Order #{order._id.slice(-8).toUpperCase()}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                mt: 0.5,
                                                                color: 'rgba(17,24,39,0.68)',
                                                                fontSize: '0.94rem',
                                                            }}
                                                        >
                                                            {new Date(order.createdAt).toLocaleString('en-GB')}
                                                        </Typography>
                                                    </Box>

                                                    <Stack
                                                        direction={{ xs: 'row', sm: 'column' }}
                                                        spacing={1}
                                                        alignItems={{ xs: 'center', sm: 'flex-end' }}
                                                    >
                                                        <Chip
                                                            label={order.status}
                                                            sx={{
                                                                textTransform: 'capitalize',
                                                                backgroundColor: 'rgba(99,102,241,0.10)',
                                                                color: '#4338ca',
                                                                fontWeight: 500,
                                                            }}
                                                        />
                                                        <Typography sx={{ fontWeight: 700, color: '#111827', fontSize: '1.15rem' }}>
                                                            ${Number(order.totalPrice).toFixed(2)}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>

                                                <Divider sx={{ my: 2, borderColor: 'rgba(17,24,39,0.08)' }} />

                                                <Stack spacing={1}>
                                                    {order.products.map((item, index) => (
                                                        <Stack
                                                            key={`${order._id}-${item._id || index}`}
                                                            direction="row"
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            sx={{
                                                                py: 1,
                                                                gap: 2,
                                                                borderBottom:
                                                                    index !== order.products.length - 1
                                                                        ? '1px solid rgba(17,24,39,0.05)'
                                                                        : 'none',
                                                            }}
                                                        >
                                                            <Box sx={{ minWidth: 0 }}>
                                                                <Typography
                                                                    sx={{
                                                                        color: '#111827',
                                                                        fontWeight: 500,
                                                                        wordBreak: 'break-word',
                                                                    }}
                                                                >
                                                                    {item.productId?.productName || 'Product removed'}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{ color: 'rgba(17,24,39,0.64)', fontSize: '0.9rem' }}
                                                                >
                                                                    Quantity: {item.quantity}
                                                                </Typography>
                                                            </Box>

                                                            <Typography
                                                                sx={{
                                                                    color: '#111827',
                                                                    fontWeight: 500,
                                                                    whiteSpace: 'nowrap',
                                                                }}
                                                            >
                                                                ${Number(item.priceAtPurchase).toFixed(2)}
                                                            </Typography>
                                                        </Stack>
                                                    ))}
                                                </Stack>

                                                <Typography
                                                    sx={{
                                                        mt: 2,
                                                        color: 'rgba(17,24,39,0.68)',
                                                        fontSize: '0.92rem',
                                                        wordBreak: 'break-word',
                                                    }}
                                                >
                                                    Shipping address: {order.address}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                )}
                            </CardContent>
                        </Card>

                        <Stack spacing={3}>
                            <Card sx={glassCardSx}>
                                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                    <Typography sx={sectionTitleSx}>Profile Details</Typography>

                                    <Stack spacing={2}>
                                        <TextField
                                            label="First name"
                                            fullWidth
                                            value={profileForm.firstName}
                                            onChange={(e) => onProfileChange('firstName', e.target.value)}
                                            sx={inputSx}
                                        />
                                        <TextField
                                            label="Last name"
                                            fullWidth
                                            value={profileForm.lastName}
                                            onChange={(e) => onProfileChange('lastName', e.target.value)}
                                            sx={inputSx}
                                        />
                                        <TextField
                                            label="Username"
                                            fullWidth
                                            value={profileForm.userName}
                                            onChange={(e) => onProfileChange('userName', e.target.value)}
                                            sx={inputSx}
                                        />
                                        <TextField
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            value={profileForm.email}
                                            onChange={(e) => onProfileChange('email', e.target.value)}
                                            sx={inputSx}
                                        />

                                        <Button
                                            variant="contained"
                                            onClick={onSaveProfile}
                                            disabled={infoLoading}
                                            sx={{
                                                mt: 1,
                                                height: 48,
                                                borderRadius: 999,
                                                textTransform: 'none',
                                                boxShadow: 'none',
                                                background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
                                                '&:hover': {
                                                    boxShadow: 'none',
                                                    background: 'linear-gradient(135deg, #0f172a 0%, #1f2937 100%)',
                                                },
                                            }}
                                        >
                                            {infoLoading ? 'Saving...' : 'Save details'}
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>

                            <ChangePasswordCard
                                form={passwordForm}
                                loading={passwordLoading}
                                successMessage={passwordSuccess}
                                errorMessage={passwordError}
                                glassCardSx={glassCardSx}
                                sectionTitleSx={sectionTitleSx}
                                inputSx={inputSx}
                                onChange={onPasswordChange}
                                onSubmit={onSavePassword}
                            />

                            <Card sx={glassCardSx}>
                                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                    <Typography sx={sectionTitleSx}>Account Snapshot</Typography>

                                    <Stack spacing={1.2}>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.68)' }}>
                                            Signed in as <strong>{profile?.userName || '-'}</strong>
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.68)' }}>
                                            Cart items currently saved: <strong>{profile?.totalItemsInCart || 0}</strong>
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.68)' }}>
                                            Current cart total: <strong>${Number(profile?.totalPrice || 0).toFixed(2)}</strong>
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default UserDashboardView;