import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

interface IMuiDialogProps {
    open: boolean;
}

const MuiDialog: React.FC<IMuiDialogProps> = ({ open }) => {
    const [openPassHelp, setOpenPassHelp] = useState(false);

    const handleClickClosePassHelp = () => setOpenPassHelp(false);

    useEffect(() => {
        if (open) setOpenPassHelp(true);
    }, [open]);

    return (
        <Dialog
            open={openPassHelp}
            onClose={handleClickClosePassHelp}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    backdropFilter: 'blur(18px)',
                    background: 'rgba(255, 255, 255, 0.65)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                    px: 2,
                    py: 1
                }
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    color: '#1a1a1a'
                }}
            >
                Cannot check out while the cart is empty!
            </DialogTitle>

            <DialogActions
                sx={{
                    justifyContent: 'center',
                    pb: 2
                }}
            >
                <Button
                    onClick={handleClickClosePassHelp}
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 500,
                        background: 'linear-gradient(135deg, #2c2c2c, #4a4a4a)',
                        color: '#fff',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #3a3a3a, #5a5a5a)',
                        }
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MuiDialog;