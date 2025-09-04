// import { useState, useCallback } from 'react';
// // import { useAuth } from '../contexts/auth-context';
// import { api } from '../lib/api';

// export interface Address {
//   _id: string;
//   street_address: string;
//   city: string;
//   state: string;
//   lga: string;
//   country: string;
//   zip_code?: string;
//   longitude?: number;
//   latitude?: number;
//   label?: string;
//   is_active?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface AddressResponse {
//   code: number;
//   message: string;
//   data: Address | Address[];
// }

// export const useAddress = (customerId?: string) => {
//   const { token } = useAuth();
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [activeAddress, setActiveAddress] = useState<Address | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Get all addresses
//   const getAddresses = useCallback(async () => {
//     if (!customerId || !token) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await api.get<AddressResponse>(`/address/customer/${customerId}`, token);
//       setAddresses(Array.isArray(res.data) ? res.data : []);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch addresses');
//     } finally {
//       setLoading(false);
//     }
//   }, [customerId, token]);

//   // Get active address
//   const getActiveAddress = useCallback(async () => {
//     if (!customerId || !token) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await api.get<AddressResponse>(`/address/customer/${customerId}/active`, token);
//       setActiveAddress(res.data as Address);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch active address');
//     } finally {
//       setLoading(false);
//     }
//   }, [customerId, token]);

//   // Add address
//   const addAddress = useCallback(async (address: Partial<Address>) => {
//     if (!customerId || !token) return;
//     setLoading(true);
//     setError(null);
//     try {
//       await api.post<AddressResponse>(`/address/customer/${customerId}`, address, token);
//       await getAddresses();
//     } catch (err: any) {
//       setError(err.message || 'Failed to add address');
//     } finally {
//       setLoading(false);
//     }
//   }, [customerId, token, getAddresses]);

//   // Update address
//   const updateAddress = useCallback(async (addressId: string, address: Partial<Address>) => {
//     if (!customerId || !token) return;
//     setLoading(true);
//     setError(null);
//     try {
//       await api.put<AddressResponse>(`/address/customer/${customerId}/${addressId}`, address, token);
//       await getAddresses();
//     } catch (err: any) {
//       setError(err.message || 'Failed to update address');
//     } finally {
//       setLoading(false);
//     }
//   }, [customerId, token, getAddresses]);

//   // Delete address
//   const deleteAddress = useCallback(async (addressId: string) => {
//     if (!customerId || !token) return;
//     setLoading(true);
//     setError(null);
//     try {
//       await api.delete<AddressResponse>(`/address/customer/${customerId}/${addressId}`, token);
//       await getAddresses();
//     } catch (err: any) {
//       setError(err.message || 'Failed to delete address');
//     } finally {
//       setLoading(false);
//     }
//   }, [customerId, token, getAddresses]);

//   // Set address as active
//   const setAddressActive = useCallback(async (addressId: string) => {
//     if (!customerId || !token) return;
//     setLoading(true);
//     setError(null);
//     try {
//       await api.patch<AddressResponse>(`/address/customer/${customerId}/${addressId}/active`, {}, token);
//       await getActiveAddress();
//       await getAddresses();
//     } catch (err: any) {
//       setError(err.message || 'Failed to set address as active');
//     } finally {
//       setLoading(false);
//     }
//   }, [customerId, token, getActiveAddress, getAddresses]);

//   return {
//     addresses,
//     activeAddress,
//     loading,
//     error,
//     getAddresses,
//     getActiveAddress,
//     addAddress,
//     updateAddress,
//     deleteAddress,
//     setAddressActive,
//   };
// };
