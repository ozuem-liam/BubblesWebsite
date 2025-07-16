import { api } from './api';
import { StaticImageData } from 'next/image';

export interface Category {
  _id: string;
  name: string;
  image: StaticImageData | string;
  meta: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Service {
  _id: string;
  name: string;
  image: StaticImageData | string;
  meta: string;
  __v: number;
  is_active: boolean;
}

export interface CategoryResponse {
  code: number;
  message: string;
  data: {
    vendorId: string;
    data: {
      service: Service;
      categories: Category[];
      _id: string;
    }
  };
}

export const categoryService = {
  async getCategoriesByServiceId(serviceId: string, token?: string): Promise<{ vendorId: string, service: Service; categories: Category[] }> {
    const response = await api.get<CategoryResponse>(`/category/${serviceId}/active`, token);
    return {
      vendorId: response.data.vendorId,
      service: response.data.data.service,
      categories: response.data.data.categories,
    };
  },
};
