import { Box, Drawer, IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useState } from 'react';
import ProductFiltersSidebar from './ProductFiltersSidebar';

const ProductFiltersBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: { xs: 'flex', lg: 'none' }, mb: 2 }}>
      <IconButton onClick={() => setOpen(true)} aria-label="Open filters">
        <TuneIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 320, p: 2 }}>
          <ProductFiltersSidebar />
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProductFiltersBar;