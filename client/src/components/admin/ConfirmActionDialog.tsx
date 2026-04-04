import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

interface ConfirmActionDialogProps {
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    danger?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmActionDialog = ({
    open,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    loading = false,
    danger = false,
    onConfirm,
    onClose,
}: ConfirmActionDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: {
                    borderRadius: '24px',
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(18px)',
                    boxShadow: '0 28px 80px rgba(15,23,42,0.18)',
                    border: '1px solid rgba(255,255,255,0.72)',
                },
            }}
        >
            <DialogTitle
                sx={{
                    pb: 1,
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: '#111827',
                }}
            >
                {title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText
                    sx={{
                        color: 'rgba(17,24,39,0.68)',
                        lineHeight: 1.75,
                    }}
                >
                    {description}
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
                <Button
                    onClick={onClose}
                    disabled={loading}
                    variant="outlined"
                    sx={{
                        borderRadius: '14px',
                        textTransform: 'none',
                        minWidth: 96,
                    }}
                >
                    {cancelText}
                </Button>

                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    variant="contained"
                    color={danger ? 'error' : 'primary'}
                    sx={{
                        borderRadius: '14px',
                        textTransform: 'none',
                        minWidth: 120,
                    }}
                >
                    {loading ? 'Working...' : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmActionDialog;