import axiosInstance from '../utils/axiosInstance';
import { ProductFilters, ProductsResponse } from '../interfaces/product-list.interface';
import { IProduct } from '../interfaces/product.interface';

const PRODUCTS_ENDPOINT = '/product/readProducts';
const PRODUCTS_PER_PAGE = 8;

const normalizeProductsResponse = (data: unknown, page: number): ProductsResponse => {
  if (Array.isArray(data)) {
    return {
      items: data as IProduct[],
      page,
      perPage: PRODUCTS_PER_PAGE,
      hasNextPage: data.length === PRODUCTS_PER_PAGE,
    };
  }

  if (data && typeof data === 'object') {
    const response = data as Partial<ProductsResponse> & {
      items?: IProduct[];
      products?: IProduct[];
    };

    const items = response.items ?? response.products ?? [];

    return {
      items,
      page: response.page ?? page,
      perPage: response.perPage ?? PRODUCTS_PER_PAGE,
      hasNextPage:
        typeof response.hasNextPage === 'boolean'
          ? response.hasNextPage
          : items.length === PRODUCTS_PER_PAGE,
      total: response.total,
    };
  }

  return {
    items: [],
    page,
    perPage: PRODUCTS_PER_PAGE,
    hasNextPage: false,
  };
};

export const getProducts = async (
  filters: ProductFilters,
  page = 1
): Promise<ProductsResponse> => {
  const params = new URLSearchParams();

  params.set('page', String(page));
  params.set('per_page', String(PRODUCTS_PER_PAGE));

  if (filters.category) params.set('category', filters.category);
  if (filters.brand) params.set('brand', filters.brand);
  if (filters.os) params.set('os', filters.os);
  if (filters.year) params.set('year', filters.year);

  const response = await axiosInstance.get(`${PRODUCTS_ENDPOINT}?${params.toString()}`);

  return normalizeProductsResponse(response.data, page);
};