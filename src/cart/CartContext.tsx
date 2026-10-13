import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { cartCount, cartReducer, cartSubtotal, type CartAction, type CartState } from "./cartReducer";

const STORAGE_KEY = "loopi.cart";

function loadCart(): CartState {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as CartState | null;
    return parsed && Array.isArray(parsed.items) ? parsed : { items: [] };
  } catch {
    return { items: [] };
  }
}

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Cart state with useReducer, saved to localStorage so it survives a reload. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage full or blocked: the cart still works for this visit.
    }
  }, [state]);

  const value = useMemo(
    () => ({ state, dispatch, count: cartCount(state), subtotal: cartSubtotal(state) }),
    [state],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
