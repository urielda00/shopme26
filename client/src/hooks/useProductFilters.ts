import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductFilters } from '../interfaces/product-list.interface';

const DEFAULT_FILTERS: ProductFilters = {
  category: '',
  brand: '',
  os: '',
  year: '',
};

export const useProductFilters = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const filters = useMemo<ProductFilters>(() => {
    return {
      category: searchParams.get('toCategory') ?? '',
      brand: searchParams.get('brand') ?? '',
      os: searchParams.get('os') ?? '',
      year: searchParams.get('year') ?? '',
    };
  }, [searchParams]);

  const updateFilters = useCallback(
    (next: Partial<ProductFilters>) => {
      const merged: ProductFilters = {
        ...filters,
        ...next,
      };

      if (!merged.category) {
        merged.brand = '';
        merged.os = '';
        merged.year = '';
      }

      const params = new URLSearchParams();

      if (merged.category) params.set('toCategory', merged.category);
      if (merged.brand) params.set('brand', merged.brand);
      if (merged.os) params.set('os', merged.os);
      if (merged.year) params.set('year', merged.year);

      navigate({
        pathname: '/productsList',
        search: params.toString(),
      });
    },
    [filters, navigate]
  );

  const clearFilters = useCallback(() => {
    navigate('/productsList');
  }, [navigate]);

  return {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters: Object.values(filters).some(Boolean),
    defaultFilters: DEFAULT_FILTERS,
  };
};