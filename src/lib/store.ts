"use client";

import { create } from 'zustand';
import { MenuItem } from '@/lib/data';

export type CartItem = MenuItem & {
    cartId: string;
    selectedModifiers: string[];
    quantity: number;
};

interface CartState {
    items: CartItem[];
    addItem: (item: MenuItem, modifiers: string[]) => void;
    removeItem: (cartId: string) => void;
    clearCart: () => void;
    total: number;
}

export const useCart = create<CartState>((set) => ({
    items: [],
    addItem: (item, modifiers) => set((state) => {
        const newItem: CartItem = {
            ...item,
            cartId: `${item.id}-${Date.now()}`,
            selectedModifiers: modifiers,
            quantity: 1,
        };
        const newItems = [...state.items, newItem];
        return {
            items: newItems,
            total: newItems.reduce((acc, i) => acc + i.price, 0),
        };
    }),
    removeItem: (cartId) => set((state) => {
        const newItems = state.items.filter((i) => i.cartId !== cartId);
        return {
            items: newItems,
            total: newItems.reduce((acc, i) => acc + i.price, 0),
        };
    }),
    clearCart: () => set({ items: [], total: 0 }),
    total: 0,
}));
