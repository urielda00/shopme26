import { Box, CircularProgress, Stack } from '@mui/material';
import { useMemo, useRef } from 'react';
import ProductListItem from './ProductListItem';
import ProductListEmpty from './ProductListEmpty';
import ProductListSkeleton from './ProductListSkeleton';
import { useInfiniteProducts } from '../../hooks/useInfiniteProducts';
import { useIntersectionLoadMore } from '../../hooks/useIntersectionLoadMore';
import { useProductFilters } from '../../hooks/useProductFilters';

const ProductList = () => {
  const { filters } = useProductFilters();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isSuccess,
  } = useInfiniteProducts(filters);

  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  useIntersectionLoadMore({
    targetRef: loadMoreRef,
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
    onLoadMore: () => {
      void fetchNextPage();
    },
  });

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (isSuccess && products.length === 0) {
    return <ProductListEmpty />;
  }

  return (
    <Stack spacing={2.5}>
      {products.map((product) => (
        <ProductListItem key={product._id} product={product} />
      ))}

      <Box
        ref={loadMoreRef}
        sx={{
          py: 2,
          display: 'flex',
          justifyContent: 'center',
          minHeight: 48,
        }}
      >
        {isFetchingNextPage ? <CircularProgress size={28} /> : null}
      </Box>
    </Stack>
  );
};

export default ProductList;