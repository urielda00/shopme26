import { Badge, Box, Button, Drawer, Stack, Typography } from '@mui/material';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { useState } from 'react';
import ProductFiltersSidebar from './ProductFiltersSidebar';
import { useProductFilters } from '../../hooks/useProductFilters';

const ProductFiltersBar = () => {
  const [open, setOpen] = useState(false);
  const { filters } = useProductFilters();

  const activeCount = [filters.category, filters.brand, filters.os, filters.year].filter(Boolean)
    .length;

  return (
    <Box sx={{ display: { xs: 'block', lg: 'none' }, mb: 2.2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Products
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.68 }}>
            Browse and refine your selection
          </Typography>
        </Box>

        <Badge badgeContent={activeCount} color="primary" invisible={activeCount === 0}>
          <Button
            onClick={() => setOpen(true)}
            startIcon={<TuneRoundedIcon />}
            variant="outlined"
            sx={{
              borderRadius: 999,
              px: 1.8,
              py: 1,
              textTransform: 'none',
              fontWeight: 700,
              borderColor: 'rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.05)',
              '&:hover': {
                background: 'rgba(255,255,255,0.09)',
                borderColor: 'rgba(255,255,255,0.28)',
              },
            }}
          >
            Filters
          </Button>
        </Badge>
      </Stack>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: { xs: 320, sm: 360 },
            maxWidth: '100vw',
            p: 2,
            height: '100%',
            background:
              'linear-gradient(180deg, rgba(248,250,252,0.96), rgba(241,245,249,0.96))',
          }}
        >
          <ProductFiltersSidebar />
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProductFiltersBar;