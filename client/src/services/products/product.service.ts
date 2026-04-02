import axiosInstance from '../../utils/axiosInstance';
import { IProduct } from '../../interfaces/product.interface';

interface SingleProductResponse {
  success: boolean;
  data: IProduct;
}

interface RelatedProductsResponse {
  success: boolean;
  data: IProduct[];
}

export const getSingleProduct = async (productId: string): Promise<IProduct> => {
  const response = await axiosInstance.get<SingleProductResponse>(`/product/${productId}`);
  return response.data.data;
};

export const getRelatedProducts = async (
  category: string,
  exclude?: string
): Promise<IProduct[]> => {
  const response = await axiosInstance.get<RelatedProductsResponse>('/product/related', {
    params: { category, exclude },
  });

  return response.data.data;
};