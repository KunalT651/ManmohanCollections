import { create } from 'zustand';
 
interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  stock: number;
  slug: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  addToCart: (item) => set((state) => {
    const exists = state.items.find(i => i.productId === item.productId);
    if (exists) {
      return {
        items: state.items.map(i => i.productId === item.productId ? { ...i, qty: i.qty + item.qty } : i)
      };
    }
    return { items: [...state.items, item] };
  }),
  removeFromCart: (productId) => set((state) => ({ items: state.items.filter(i => i.productId !== productId) })),
  updateQty: (productId, qty) => set((state) => ({ items: state.items.map(i => i.productId === productId ? { ...i, qty } : i) })),
  clearCart: () => set({ items: [] }),
})); 