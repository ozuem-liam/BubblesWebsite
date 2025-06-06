"use client";

import { useEffect, useState } from "react";
import { Shop, shopService } from "../lib/shop";
import { useAuth } from "../contexts/auth-context";
import { Item } from "@/lib/order-flow";

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
        setError(err instanceof Error ? err.message : "Failed to fetch shops");
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

export const useBubbleShop = () => {
  const { token } = useAuth();
  const [shop, setShop] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [paginationTotal, setPaginationTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        const response = await shopService.searchForBubblesShops(token!);
        setShop(response.data.results);
        setPaginationTotal(response?.data?.pagination?.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch shops");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchShop();
    }
  }, [token, paginationPage]);

  return { shop, loading, error };
};

export const useBubbleShopItems = (q: string) => {
  const { token } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginationPage, setPaginationPage] = useState<number>(1);
  const [paginationTotal, setPaginationTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (paginationPage === 1) setLoading(true);
        const response = await shopService.searchForBubblesShopItem(q);
        console.log(response);
        setItems(response.data.results);
        setPaginationTotal(response?.data?.pagination?.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch shops");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);
  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       if (paginationPage === 1) setLoading(true)
  //       const response = await shopService.searchForBubblesShopItem(q, token!)
  //       setItems(response.data.results)
  //       setPaginationTotal(response?.data?.pagination?.total)
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'Failed to fetch shops')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   if (token) {
  //     fetchItems()
  //   }
  // }, [token])

  return {
    items,
    loading,
    error,
    paginationTotal,
    setPaginationPage,
    paginationPage,
  };
};
