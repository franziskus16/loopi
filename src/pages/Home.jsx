import { useState, useEffect } from "react";
import { getAllProducts } from "../services/api";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <header>
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Product Collection
        </h2>

        <p className="mt-4 max-w-md text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
          praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
          natus?
        </p>
      </header>

      <div className="mt-8 sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:gap-4">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="relative">
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
          </div>
          <div className="relative">
            {" "}
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("");
              }}
              className="text-sm px-4 py-2 text-gray-400 hover:text-gray-500 transition hover:underline"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
