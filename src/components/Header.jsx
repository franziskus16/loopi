import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white text-black shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Loopi
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
