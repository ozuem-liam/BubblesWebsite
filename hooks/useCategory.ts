import { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/auth-context';
import { Category, categoryService, Service } from '../lib/category';

export const useCategory = (serviceId?: string) => {
  const token = '';
  const [categories, setCategories] = useState<Category[]>();
  const [service, setService] = useState<Service>();
  const [vendorId, setVendorId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId || !token) return;
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use the same pattern as in useOrderFlow, but for categories
        const response = await categoryService.getCategoriesByServiceId(serviceId, token);
        setCategories(response.categories);
        setService(response.service);
        setVendorId(response.vendorId);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [serviceId, token]);

  return { categories, service, vendorId, loading, error };
};
