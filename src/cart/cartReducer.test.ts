import { cartCount, cartReducer, cartSubtotal, MAX_QUANTITY, type CartState } from "./cartReducer";

const lemon = { id: 31, title: "Lemon", price: 0.79, thumbnail: "lemon.webp" };
const bed = { id: 11, title: "Bed", price: 1899.99, thumbnail: "bed.webp" };
const empty: CartState = { items: [] };

describe("cartReducer", () => {
  it("adds a new product with the chosen quantity", () => {
    const state = cartReducer(empty, { type: "add", product: lemon, quantity: 3 });
    expect(state.items).toEqual([{ ...lemon, quantity: 3 }]);
  });

  it("adds to the quantity when the product is already in the cart", () => {
    let state = cartReducer(empty, { type: "add", product: lemon, quantity: 2 });
    state = cartReducer(state, { type: "add", product: lemon, quantity: 1 });
    expect(state.items).toHaveLength(1);
    expect(state.items[0]?.quantity).toBe(3);
  });

  it("keeps quantities between 1 and the maximum", () => {
    let state = cartReducer(empty, { type: "add", product: lemon, quantity: 50 });
    expect(state.items[0]?.quantity).toBe(MAX_QUANTITY);
    state = cartReducer(state, { type: "setQuantity", id: lemon.id, quantity: 0 });
    expect(state.items[0]?.quantity).toBe(1);
  });

  it("removes one product and can clear everything", () => {
    let state = cartReducer(empty, { type: "add", product: lemon, quantity: 1 });
    state = cartReducer(state, { type: "add", product: bed, quantity: 1 });
    state = cartReducer(state, { type: "remove", id: lemon.id });
    expect(state.items.map((item) => item.id)).toEqual([bed.id]);
    expect(cartReducer(state, { type: "clear" })).toEqual(empty);
  });

  it("counts items and adds up the subtotal", () => {
    let state = cartReducer(empty, { type: "add", product: lemon, quantity: 2 });
    state = cartReducer(state, { type: "add", product: bed, quantity: 1 });
    expect(cartCount(state)).toBe(3);
    expect(cartSubtotal(state)).toBeCloseTo(1901.57);
  });
});
