// stores/CartStore.ts
'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import {
  Item,
  CartData,
  orderFlowService,
  CartItemDetail,
} from '../lib/order-flow'
import { toast } from 'sonner'

export interface LocalCartItem {
  item: Item
  quantity: number
}

// Define LocalCart type for the reduce accumulator
type LocalCart = Record<string, LocalCartItem>

interface CartState {
  shopId: string | null
  cart: CartData | null
  localCart: Record<string, LocalCartItem>
  setCart: (cart: CartData | null) => void
  setLocalCart: (localCart: Record<string, LocalCartItem>) => void
  initializeCart: (token: string) => Promise<void>
  addToLocalCart: (item: Item) => void
  removeFromLocalCart: (itemId: string) => void
  updateLocalCartQuantity: (itemId: string, newQuantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: null,
      shopId: null,
      localCart: {},
      setCart: (cart) => set({ cart }),
      setLocalCart: (localCart) => set({ localCart }),
      initializeCart: async (token: string) => {
        try {
          const resp = await orderFlowService.getCart(token)
          set({
            cart: resp.data,
            localCart: resp.data.items.reduce(
              (acc: LocalCart, cartItem: CartItemDetail) => {
                acc[cartItem.item._id] = {
                  item: cartItem.item,
                  quantity: cartItem.quantity,
                }
                return acc
              },
              {} as LocalCart
            ),
          })
        } catch (error) {
          console.error('Failed to initialize cart:', error)
        }
      },
      addToLocalCart: (item) =>
        set((state) => {
          const isMultipleStore =
            state.shopId !== null && item.vendor !== state.shopId
          if (isMultipleStore) {
            toast.error("Please complete your current order before shopping from another store")
            return state
          }
          return {
            localCart: {
              ...state.localCart,
              [item._id]: {
                item,
                quantity: (state.localCart[item._id]?.quantity || 0) + 1,
              },
            },
            shopId:item.vendor
          }
        }),
      removeFromLocalCart: (itemId) =>
        set((state) => {
          const newLocalCart = { ...state.localCart }
          delete newLocalCart[itemId]
          return { localCart: newLocalCart }
        }),
      updateLocalCartQuantity: (itemId, newQuantity) =>
        set((state) => {
          if (newQuantity < 1) {
            const newLocalCart = { ...state.localCart }
            delete newLocalCart[itemId]
            return { localCart: newLocalCart }
          }
          return {
            localCart: {
              ...state.localCart,
              [itemId]: {
                ...state.localCart[itemId],
                quantity: newQuantity,
              },
            },
          }
        }),
      clearCart: () => set({ cart: null, shopId:null, localCart: {} }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
