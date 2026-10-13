import type { ProductSummary } from "../types";

export const MAX_QUANTITY = 10;

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export type CartState = { items: CartItem[] };

export type CartAction =
  | { type: "add"; product: Pick<ProductSummary, "id" | "title" | "price" | "thumbnail">; quantity: number }
  | { type: "setQuantity"; id: number; quantity: number }
  | { type: "remove"; id: number }
  | { type: "clear" };

const clamp = (quantity: number) => Math.min(Math.max(Math.trunc(quantity), 1), MAX_QUANTITY);

/** Pure state transitions for the cart, so they can be tested without React. */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: clamp(item.quantity + action.quantity) }
              : item,
          ),
        };
      }
      const { id, title, price, thumbnail } = action.product;
      return { items: [...state.items, { id, title, price, thumbnail, quantity: clamp(action.quantity) }] };
    }
    case "setQuantity":
      return {
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: clamp(action.quantity) } : item,
        ),
      };
    case "remove":
      return { items: state.items.filter((item) => item.id !== action.id) };
    case "clear":
      return { items: [] };
  }
}

export const cartCount = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const cartSubtotal = (state: CartState): number =>
  state.items.reduce((total, item) => total + item.price * item.quantity, 0);
