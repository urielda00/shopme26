import { Box, Button, Stack, Typography } from '@mui/material';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import { categoryList } from '../../utils/data/productsData';
import { useProductFilters } from '../../hooks/useProductFilters';

const ProductsToolbar = () => {
  const { filters, updateFilters } = useProductFilters();

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1.5}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        sx={{ mb: 1.5 }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
            Discover Devices
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.7, mt: 0.5 }}>
            Clean, modern selection with smart filtering
          </Typography>
        </Box>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        flexWrap="wrap"
        sx={{
          p: 1.2,
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <Button
          variant={!filters.category ? 'contained' : 'outlined'}
          startIcon={<AppsRoundedIcon />}
          onClick={() => updateFilters({ category: '', brand: '', os: '', year: '' })}
          sx={{
            borderRadius: 999,
            textTransform: 'none',
            fontWeight: 700,
            px: 1.8,
          }}
        >
          See All
        </Button>

        {categoryList
          .filter((item) => item.category)
          .map((item) => (
            <Button
              key={String(item.category)}
              variant={filters.category === item.category ? 'contained' : 'outlined'}
              onClick={() =>
                updateFilters({
                  category: String(item.category),
                  brand: '',
                  os: '',
                  year: '',
                })
              }
              startIcon={<Box sx={{ display: 'flex', alignItems: 'center' }}>{item.icon}</Box>}
              sx={{
                borderRadius: 999,
                textTransform: 'none',
                fontWeight: 700,
                px: 1.8,
              }}
            >
              {item.name}
            </Button>
          ))}
      </Stack>
    </Box>
  );
};

export default ProductsToolbar;