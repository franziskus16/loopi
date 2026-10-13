import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import QuantityInput from "../components/QuantityInput";
import Rating from "../components/Rating";
import StatusMessage from "../components/StatusMessage";
import { useProduct } from "../hooks/useProducts";
import { formatCategory, formatPrice, originalPrice } from "../utils/format";

const BackLink = () => (
  <Link to="/" className="text-sm text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline">
    ← Back to all products
  </Link>
);

const ProductDetail = () => {
  const { id } = useParams();
  const { product, status } = useProduct(id);
  const { dispatch } = useCart();
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState<number | null>(null);

  useEffect(() => {
    setImageIndex(0);
    setQuantity(1);
    setAdded(null);
  }, [id]);

  useEffect(() => {
    if (product) document.title = `${product.title} · Loopi`;
  }, [product]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4">
        <StatusMessage title="Loading product…" />
      </div>
    );
  }

  if (status !== "ready" || !product) {
    return (
      <div className="container mx-auto px-4">
        <StatusMessage
          kind="error"
          title={status === "not-found" ? "This product doesn't exist." : "We couldn't load this product."}
        >
          <BackLink />
        </StatusMessage>
      </div>
    );
  }

  const before = originalPrice(product.price, product.discountPercentage);
  const outOfStock = product.stock === 0;

  const addToCart = () => {
    dispatch({ type: "add", product, quantity });
    setAdded(quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BackLink />
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div>
          <img
            src={product.images[imageIndex] ?? product.thumbnail}
            alt={product.title}
            className="aspect-square w-full rounded-lg bg-gray-100 object-contain"
          />
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={`Show image ${index + 1} of ${product.images.length}`}
                  aria-pressed={index === imageIndex}
                  className={`shrink-0 rounded-md border-2 ${index === imageIndex ? "border-gray-900" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={image} alt="" className="size-16 rounded object-cover sm:size-20" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            {formatCategory(product.category)}
            {product.brand && ` · ${product.brand}`}
          </p>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <div className="flex items-center gap-2">
            <Rating value={product.rating} />
            <span className="text-sm text-gray-600">
              ({product.reviews.length} {product.reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
          <p>
            <span className="text-3xl font-semibold text-gray-900">{formatPrice(product.price)}</span>
            {before && (
              <span className="ml-3 text-gray-500 line-through">
                <span className="sr-only">Was </span>
                {formatPrice(before)}
              </span>
            )}
          </p>
          <p className="text-gray-700">{product.description}</p>

          <div className="flex flex-wrap items-center gap-4">
            <QuantityInput value={quantity} onChange={setQuantity} label="Quantity" />
            <button
              type="button"
              onClick={addToCart}
              disabled={outOfStock}
              className="rounded-md bg-gray-900 px-6 py-2.5 font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
            >
              {outOfStock ? "Out of stock" : "Add to cart"}
            </button>
          </div>
          <p className="min-h-6 text-sm text-green-700" role="status">
            {added && (
              <>
                Added {added} to your cart.{" "}
                <Link to="/cart" className="underline">
                  View cart
                </Link>
              </>
            )}
          </p>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg border border-gray-200 p-5 text-sm">
            <div>
              <dt className="text-gray-500">Availability</dt>
              <dd className="font-medium">{product.availabilityStatus}</dd>
            </div>
            <div>
              <dt className="text-gray-500">In stock</dt>
              <dd className="font-medium">{product.stock} units</dd>
            </div>
            <div>
              <dt className="text-gray-500">Shipping</dt>
              <dd className="font-medium">{product.shippingInformation}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Returns</dt>
              <dd className="font-medium">{product.returnPolicy}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-gray-500">SKU</dt>
              <dd className="font-mono">{product.sku}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
