import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
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

function App() {
  return (
    <Router>
      <Header />
      <main id="main" className="min-h-[calc(100vh-160px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
