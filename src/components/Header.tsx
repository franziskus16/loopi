import { Link, NavLink } from "react-router-dom";
import { useCart } from "../cart/CartContext";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `underline-offset-4 hover:underline ${isActive ? "font-semibold underline" : ""}`;

const Header = () => {
  const { count } = useCart();

  return (
    <header className="bg-white text-gray-900 shadow-sm">
      <a
        href="#main"
        className="absolute -top-20 left-4 z-10 rounded bg-gray-900 px-4 py-2 text-white focus:top-4"
      >
        Skip to content
      </a>
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-2xl font-bold">
          Loopi
        </Link>
        <nav aria-label="Main" className="flex items-center gap-6">
          <NavLink to="/" end className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${isActive ? "border-gray-900" : "border-gray-300 hover:border-gray-900"}`
            }
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span>Cart</span>
            <span
              data-testid="cart-count"
              className="min-w-6 rounded-full bg-gray-900 px-1.5 text-center text-sm text-white"
            >
              {count}
              <span className="sr-only">{` ${count === 1 ? "item" : "items"}`}</span>
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
