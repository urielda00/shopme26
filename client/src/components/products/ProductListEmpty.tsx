import { Box, Typography } from '@mui/material';

const ProductListEmpty = () => {
  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        textAlign: 'center',
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        No products found
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.72 }}>
        Try changing the selected filters.
      </Typography>
    </Box>
  );
};

export default ProductListEmpty;