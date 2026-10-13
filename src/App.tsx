import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart/CartContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

const NotFound = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-3xl font-bold">Page not found</h1>
    <Link to="/" className="mt-4 inline-block underline">
      Go to the shop
    </Link>
  </div>
);

/** Routes and layout, without the router, so tests can wrap it in a MemoryRouter. */
export function AppRoutes() {
  return (
    <CartProvider>
      <Header />
      <main id="main" className="min-h-[calc(100vh-160px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
