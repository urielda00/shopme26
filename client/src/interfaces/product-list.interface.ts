import { IProduct } from './product.interface';

export interface ProductFilters {
  category: string;
  brand: string;
  os: string;
  year: string;
}

export interface ProductsResponse {
  items: IProduct[];
  page: number;
  perPage: number;
  hasNextPage: boolean;
  total?: number;
}

export interface ProductQueryParams {
  pageParam?: number;
  filters: ProductFilters;
}