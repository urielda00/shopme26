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
        <Dialog open={openPassHelp} onClose={handleClickClosePassHelp}>
            <DialogTitle>Cannot check out while the cart is empty!</DialogTitle>
            <DialogActions>
                <Button onClick={handleClickClosePassHelp} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MuiDialog;