// hooks/useShops.ts
'use client';

import { useEffect, useState } from 'react';
import { Shop, ShopListResponse, shopService } from '../lib/shop';
import { useAuth } from '../contexts/auth-context';

export const useShops = (page = 1, limit = 10) => {
  const { token } = useAuth();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const response = await shopService.getShops(token!, page, limit);
        setShops(response.data.results);
        setMeta(response.data.pagination || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch shops');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchShops();
    }
  }, [token, page, limit]);

  return { shops, loading, error, meta };
};