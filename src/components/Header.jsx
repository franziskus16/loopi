import { NavLink, Link } from "react-router-dom";

const navClass = ({ isActive }) =>
  `underline-offset-4 hover:underline ${isActive ? "font-semibold underline" : ""}`;

const Header = () => (
  <header className="bg-white text-gray-900 shadow-sm">
    <a
      href="#main"
      className="absolute -top-20 left-4 z-10 rounded bg-gray-900 px-4 py-2 text-white focus:top-4"
    >
      Skip to content
    </a>
    <div className="container mx-auto flex items-center justify-between px-4 py-4">
      <Link to="/" className="text-2xl font-bold">
        Loopi
      </Link>
      <nav aria-label="Main" className="flex gap-6">
        <NavLink to="/" end className={navClass}>
          Shop
        </NavLink>
        <NavLink to="/about" className={navClass}>
          About
        </NavLink>
      </nav>
    </div>
  </header>
);

export default Header;
