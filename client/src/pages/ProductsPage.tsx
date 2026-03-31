import { Box, Container, Grid } from '@mui/material';
import ProductsToolbar from '../components/products/ProductsToolbar';
import ProductFiltersBar from '../components/products/ProductFiltersBar';
import ProductFiltersSidebar from '../components/products/ProductFiltersSidebar';
import ProductList from '../components/products/ProductList';

const ProductsPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 12, md: 14 },
        pb: 6,
      }}
    >
      <Container maxWidth="xl">
        <ProductsToolbar />
        <ProductFiltersBar />

        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <ProductFiltersSidebar />
          </Grid>

          <Grid item xs={12} lg={9}>
            <ProductList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductsPage;