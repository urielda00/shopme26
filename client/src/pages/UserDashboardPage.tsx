import { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateAuthUser } from '../features/userSlice';
import {
    getMyOrdersAPI,
    getMyProfileAPI,
    updateUserInfoAPI,
    updateUserPasswordAPI,
    IUserOrder,
    IUserProfile,
} from '../services/userDashboardService';
import { useTitle } from '../hooks/useTitle';

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

const UserDashboardPage = () => {
    useTitle('Dashboard');
    const dispatch = useAppDispatch();
    const { userId } = useAppSelector((state) => state.user);

    const [profile, setProfile] = useState<IUserProfile | null>(null);
    const [orders, setOrders] = useState<IUserOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const [infoLoading, setInfoLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const [infoSuccess, setInfoSuccess] = useState('');
    const [infoError, setInfoError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [profileForm, setProfileForm] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
    });

    const [passwordForm, setPasswordForm] = useState({
        insertPrePassword: '',
        password: '',
        verifyPass: '',
    });

    const totalSpent = useMemo(() => {
        return orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);
    }, [orders]);

    const latestOrderDate = useMemo(() => {
        if (!orders.length) return 'No orders yet';

        return new Date(orders[0].createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    }, [orders]);

    const totalProductsOrdered = useMemo(() => {
        return orders.reduce((sum, order) => {
            const orderQty = order.products.reduce((innerSum, item) => innerSum + (item.quantity || 0), 0);
            return sum + orderQty;
        }, 0);
    }, [orders]);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);

                const [profileResponse, ordersResponse] = await Promise.all([
                    getMyProfileAPI(),
                    getMyOrdersAPI(),
                ]);

                const fetchedProfile: IUserProfile = {
                    userId: profileResponse.userId,
                    userName: profileResponse.userName,
                    firstName: profileResponse.firstName,
                    lastName: profileResponse.lastName,
                    email: profileResponse.email,
                    isAdmin: profileResponse.isAdmin,
                    cart: profileResponse.cart || [],
                    totalPrice: profileResponse.totalPrice || 0,
                    totalItemsInCart: profileResponse.totalItemsInCart || 0,
                };

                const fetchedOrders: IUserOrder[] = Array.isArray(ordersResponse.orders)
                    ? ordersResponse.orders
                    : [];

                setProfile(fetchedProfile);
                setOrders(fetchedOrders);

                setProfileForm({
                    firstName: fetchedProfile.firstName || '',
                    lastName: fetchedProfile.lastName || '',
                    userName: fetchedProfile.userName || '',
                    email: fetchedProfile.email || '',
                });
            } catch (error: any) {
                setInfoError(error?.response?.data?.message || 'Failed to load user dashboard');
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    const handleProfileInputChange = (field: string, value: string) => {
        setProfileForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePasswordInputChange = (field: string, value: string) => {
        setPasswordForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveProfile = async () => {
        try {
            if (!userId) {
                setInfoError('Missing authenticated user id');
                return;
            }

            setInfoLoading(true);
            setInfoError('');
            setInfoSuccess('');

            const response = await updateUserInfoAPI(userId, profileForm);
            const updated = response.data;

            setProfile((prev) =>
                prev
                    ? {
                          ...prev,
                          firstName: updated.firstName,
                          lastName: updated.lastName,
                          userName: updated.userName,
                          email: updated.email,
                      }
                    : prev
            );

            dispatch(updateAuthUser({ userName: updated.userName }));
            setInfoSuccess('Account details updated successfully');
        } catch (error: any) {
            const backendErrors = error?.response?.data?.errors;
            if (Array.isArray(backendErrors) && backendErrors.length > 0) {
                setInfoError(backendErrors.join(', '));
            } else {
                setInfoError(error?.response?.data?.message || 'Failed to update account details');
            }
        } finally {
            setInfoLoading(false);
        }
    };

    const handleSavePassword = async () => {
        try {
            if (!userId) {
                setPasswordError('Missing authenticated user id');
                return;
            }

            setPasswordLoading(true);
            setPasswordError('');
            setPasswordSuccess('');

            await updateUserPasswordAPI(userId, passwordForm);

            setPasswordForm({
                insertPrePassword: '',
                password: '',
                verifyPass: '',
            });

            setPasswordSuccess('Password updated successfully');
        } catch (error: any) {
            const backendErrors = error?.response?.data?.errors;
            if (Array.isArray(backendErrors) && backendErrors.length > 0) {
                setPasswordError(backendErrors.join(', '));
            } else {
                setPasswordError(error?.response?.data?.message || 'Failed to update password');
            }
        } finally {
            setPasswordLoading(false);
        }
    };

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

                    {(infoError || infoSuccess || passwordError || passwordSuccess) && (
                        <Stack spacing={1}>
                            {infoError ? <Alert severity="error">{infoError}</Alert> : null}
                            {infoSuccess ? <Alert severity="success">{infoSuccess}</Alert> : null}
                            {passwordError ? <Alert severity="error">{passwordError}</Alert> : null}
                            {passwordSuccess ? <Alert severity="success">{passwordSuccess}</Alert> : null}
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
                                            onChange={(e) => handleProfileInputChange('firstName', e.target.value)}
                                            sx={inputSx}
                                        />
                                        <TextField
                                            label="Last name"
                                            fullWidth
                                            value={profileForm.lastName}
                                            onChange={(e) => handleProfileInputChange('lastName', e.target.value)}
                                            sx={inputSx}
                                        />
                                        <TextField
                                            label="Username"
                                            fullWidth
                                            value={profileForm.userName}
                                            onChange={(e) => handleProfileInputChange('userName', e.target.value)}
                                            sx={inputSx}
                                        />
                                        <TextField
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            value={profileForm.email}
                                            onChange={(e) => handleProfileInputChange('email', e.target.value)}
                                            sx={inputSx}
                                        />

                                        <Button
                                            variant="contained"
                                            onClick={handleSaveProfile}
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

                            <Card sx={glassCardSx}>
                                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                    <Typography sx={sectionTitleSx}>Change Password</Typography>

                                    <Stack spacing={2}>
                                        <TextField
                                            label="Current password"
                                            type="password"
                                            fullWidth
                                            value={passwordForm.insertPrePassword}
                                            onChange={(e) =>
                                                handlePasswordInputChange('insertPrePassword', e.target.value)
                                            }
                                            sx={inputSx}
                                        />
                                        <TextField
                                            label="New password"
                                            type="password"
                                            fullWidth
                                            value={passwordForm.password}
                                            onChange={(e) => handlePasswordInputChange('password', e.target.value)}
                                            sx={inputSx}
                                        />
                                        <TextField
                                            label="Confirm new password"
                                            type="password"
                                            fullWidth
                                            value={passwordForm.verifyPass}
                                            onChange={(e) => handlePasswordInputChange('verifyPass', e.target.value)}
                                            sx={inputSx}
                                        />

                                        <Button
                                            variant="contained"
                                            onClick={handleSavePassword}
                                            disabled={passwordLoading}
                                            sx={{
                                                mt: 1,
                                                height: 48,
                                                borderRadius: 999,
                                                textTransform: 'none',
                                                boxShadow: 'none',
                                                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                                '&:hover': {
                                                    boxShadow: 'none',
                                                    background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                                                },
                                            }}
                                        >
                                            {passwordLoading ? 'Updating...' : 'Update password'}
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>

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

export default UserDashboardPage;