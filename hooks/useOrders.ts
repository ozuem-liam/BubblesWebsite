import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Order, orderService } from '@/lib/order';

export const useOrders = (page = 1, limit = 10) => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page,
    limit,
  });

  const fetchOrders = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await orderService.getOrders(token, page, limit);
      setOrders(response.data.results);
      setPagination({
        total: response.data.pagination?.total || 0,
        page: response.data.pagination?.page ?? page,
        limit: response.data.pagination?.limit ?? limit,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token, page, limit]);

  return { orders, loading, error, pagination, refresh: fetchOrders };
};