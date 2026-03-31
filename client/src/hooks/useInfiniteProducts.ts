import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '../services/productsService';
import { ProductFilters } from '../interfaces/product-list.interface';

export const useInfiniteProducts = (filters: ProductFilters) => {
  return useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam }) => getProducts(filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};