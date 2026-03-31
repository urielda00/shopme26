import { Box, Button, Stack } from '@mui/material';
import { categoryList } from '../../utils/data/productsData';
import { useProductFilters } from '../../hooks/useProductFilters';

const ProductsToolbar = () => {
  const { filters, updateFilters } = useProductFilters();

  return (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      flexWrap="wrap"
      sx={{
        mb: 3,
      }}
    >
      <Button
        variant={!filters.category ? 'contained' : 'outlined'}
        onClick={() => updateFilters({ category: '', brand: '', os: '', year: '' })}
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
            startIcon={<Box sx={{ display: 'flex' }}>{item.icon}</Box>}
          >
            {item.name}
          </Button>
        ))}
    </Stack>
  );
};

export default ProductsToolbar;