import { useQuery } from '@tanstack/react-query';
import { getRelatedProducts, getSingleProduct } from './product.service';

export const useProduct = (productId?: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getSingleProduct(productId as string),
    enabled: !!productId,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useRelatedProducts = (category?: string, exclude?: string) => {
  return useQuery({
    queryKey: ['related-products', category, exclude],
    queryFn: () => getRelatedProducts(category as string, exclude),
    enabled: !!category,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};