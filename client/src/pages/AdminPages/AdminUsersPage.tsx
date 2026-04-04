import { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmActionDialog from '../../components/admin/ConfirmActionDialog';
import {
    deleteAdminUserAPI,
    getAdminUsersAPI,
    updateAdminUserAPI,
} from '../../services/adminService';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

const panelStyles = {
    p: 3,
    background: 'rgba(255,255,255,0.82)',
    border: '1px solid rgba(255,255,255,0.72)',
    boxShadow: '0 22px 60px rgba(15,23,42,0.08)',
};

interface DeleteUserState {
    id: string;
    name: string;
}

const AdminUsersPage = () => {
    const [search, setSearch] = useState('');
    const [userToDelete, setUserToDelete] = useState<DeleteUserState | null>(null);

    const debouncedSearch = useDebouncedValue(search, 400);
    const normalizedSearch = debouncedSearch.trim();
    const queryClient = useQueryClient();

    const { data, isLoading, isFetching, isError, error } = useQuery({
        queryKey: ['adminUsers', normalizedSearch],
        queryFn: () => getAdminUsersAPI({ search: normalizedSearch }),
        placeholderData: (previousData) => previousData,
        enabled: normalizedSearch.length === 0 || normalizedSearch.length >= 2,
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: any }) => updateAdminUserAPI(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteAdminUserAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
            setUserToDelete(null);
        },
    });

    const users = data?.data?.items || [];

    const handleToggleAdmin = (user: any) => {
        updateMutation.mutate({
            id: user._id,
            payload: { isAdmin: !user.isAdmin },
        });
    };

    const openDeleteDialog = (user: any) => {
        setUserToDelete({
            id: user._id,
            name: `${user.firstName} ${user.lastName}`.trim(),
        });
    };

    const closeDeleteDialog = () => {
        if (deleteMutation.isPending) return;
        setUserToDelete(null);
    };

    const confirmDeleteUser = () => {
        if (!userToDelete?.id) return;
        deleteMutation.mutate(userToDelete.id);
    };

    return (
        <AdminLayout title="Users Management" subtitle="Manage registered users and admin access">
            {isError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>
                    {error instanceof Error ? error.message : 'Failed to load users'}
                </Alert>
            )}

            {deleteMutation.isError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>
                    Failed to delete user.
                </Alert>
            )}

            <Stack spacing={4}>
                <Paper sx={panelStyles}>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ xs: 'stretch', md: 'center' }}
                        spacing={2}
                        sx={{ mb: 3 }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827' }}>
                            All Users
                        </Typography>

                        <Box sx={{ width: { xs: '100%', md: '300px' }, position: 'relative' }}>
                            <TextField
                                size="small"
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                sx={{ width: '100%' }}
                            />
                            {isFetching && !isLoading && (
                                <CircularProgress
                                    size={16}
                                    sx={{
                                        position: 'absolute',
                                        right: 12,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                    }}
                                />
                            )}
                        </Box>
                    </Stack>

                    {normalizedSearch.length === 1 ? (
                        <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                            Type at least 2 characters to search.
                        </Typography>
                    ) : isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : users.length === 0 ? (
                        <Typography sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                            No users found.
                        </Typography>
                    ) : (
                        <Stack spacing={2}>
                            {users.map((user: any) => (
                                <Box
                                    key={user._id}
                                    sx={{
                                        p: 2,
                                        borderRadius: '20px',
                                        border: '1px solid rgba(148,163,184,0.14)',
                                        background: 'rgba(248,250,252,0.92)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        flexWrap: 'wrap',
                                        gap: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{ color: '#111827', fontWeight: 600 }}>
                                            {user.firstName} {user.lastName}
                                        </Typography>
                                        <Typography sx={{ color: 'rgba(17,24,39,0.56)', fontSize: '0.9rem', mt: 0.4 }}>
                                            @{user.userName} - {user.email}
                                        </Typography>
                                    </Box>

                                    <Stack direction="row" spacing={1.25} alignItems="center">
                                        <Typography sx={{ color: 'rgba(17,24,39,0.56)' }}>Admin</Typography>

                                        <Switch
                                            checked={Boolean(user.isAdmin)}
                                            onChange={() => handleToggleAdmin(user)}
                                            disabled={updateMutation.isPending && updateMutation.variables?.id === user._id}
                                        />

                                        <Button
                                            color="error"
                                            variant="outlined"
                                            onClick={() => openDeleteDialog(user)}
                                            disabled={deleteMutation.isPending && userToDelete?.id === user._id}
                                            sx={{ borderRadius: '14px', textTransform: 'none' }}
                                        >
                                            {deleteMutation.isPending && userToDelete?.id === user._id ? 'Working...' : 'Delete'}
                                        </Button>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Paper>
            </Stack>

            <ConfirmActionDialog
                open={Boolean(userToDelete)}
                title="Delete user"
                description={`Are you sure you want to delete "${userToDelete?.name || ''}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                loading={deleteMutation.isPending}
                danger
                onClose={closeDeleteDialog}
                onConfirm={confirmDeleteUser}
            />
        </AdminLayout>
    );
};

export default AdminUsersPage;