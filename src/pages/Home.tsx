import { useEffect, useMemo, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import StatusMessage from "../components/StatusMessage";
import { useProducts } from "../hooks/useProducts";
import type { ProductSummary } from "../types";

/** Case-insensitive title search combined with an optional category. */
// eslint-disable-next-line react-refresh/only-export-components
export function filterProducts(products: ProductSummary[], search: string, category: string) {
  const query = search.trim().toLowerCase();
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(query) && (!category || product.category === category),
  );
}

const Home = () => {
  const { products, status, retry } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    document.title = "Loopi";
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products],
  );

  const filteredProducts = useMemo(
    () => filterProducts(products, search, selectedCategory),
    [products, search, selectedCategory],
  );

  const hasFilters = search !== "" || selectedCategory !== "";

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Product collection</h1>
        <p className="mt-3 text-gray-600">
          Beauty, furniture, fragrances, groceries and more. Search by name or narrow the list by
          category.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("");
            }}
            className="self-start px-2 py-2.5 text-sm text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline sm:self-auto"
          >
            Clear filters
          </button>
        )}
      </div>

      {status === "loading" && <StatusMessage title="Loading products…" />}

      {status === "error" && (
        <StatusMessage kind="error" title="We couldn't load the products.">
          <button
            type="button"
            onClick={retry}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
          >
            Try again
          </button>
        </StatusMessage>
      )}

      {status === "ready" && (
        <>
          <p className="mt-6 text-sm text-gray-600" role="status">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </p>
          {filteredProducts.length > 0 ? (
            <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <StatusMessage kind="empty" title="No products match your search." />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
