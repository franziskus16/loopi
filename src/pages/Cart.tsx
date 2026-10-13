import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import QuantityInput from "../components/QuantityInput";
import { formatPrice } from "../utils/format";

const Cart = () => {
  const { state, dispatch, count, subtotal } = useCart();
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    document.title = "Your cart · Loopi";
  }, []);

  if (ordered) {
    return (
      <section className="container mx-auto max-w-3xl px-4 py-16 text-center" role="status">
        <h1 className="text-3xl font-bold">Thanks for your order!</h1>
        <p className="mt-3 text-gray-600">This is a demo shop, so nothing was charged or shipped.</p>
        <Link to="/" className="mt-6 inline-block rounded-md bg-gray-900 px-6 py-2.5 font-medium text-white">
          Keep shopping
        </Link>
      </section>
    );
  }

  if (state.items.length === 0) {
    return (
      <section className="container mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <Link to="/" className="mt-6 inline-block underline">
          Browse the products
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Your cart</h1>
      <p className="mt-1 text-gray-600">
        {count} {count === 1 ? "item" : "items"}
      </p>

      <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
        {state.items.map((item) => (
          <li key={item.id} className="flex flex-wrap items-center gap-4 py-4">
            <img src={item.thumbnail} alt="" className="size-20 rounded-md bg-gray-100 object-cover" />
            <div className="min-w-40 flex-1">
              <Link to={`/product/${item.id}`} className="font-medium hover:underline">
                {item.title}
              </Link>
              <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
            </div>
            <QuantityInput
              value={item.quantity}
              label={`Quantity of ${item.title}`}
              onChange={(quantity) => dispatch({ type: "setQuantity", id: item.id, quantity })}
            />
            <p className="w-24 text-right font-semibold">{formatPrice(item.price * item.quantity)}</p>
            <button
              type="button"
              onClick={() => dispatch({ type: "remove", id: item.id })}
              aria-label={`Remove ${item.title}`}
              className="text-sm text-gray-600 underline-offset-4 hover:text-red-700 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col items-end gap-4">
        <p className="text-lg">
          Subtotal: <strong data-testid="subtotal">{formatPrice(subtotal)}</strong>
        </p>
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "clear" });
            setOrdered(true);
          }}
          className="rounded-md bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-700"
        >
          Place order
        </button>
      </div>
    </section>
  );
};

export default Cart;
