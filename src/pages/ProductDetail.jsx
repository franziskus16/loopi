import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import StatusMessage from "../components/StatusMessage";
import { getProductById } from "../services/api";
import { formatCategory, formatPrice, originalPrice } from "../utils/format";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setMainImage(0);

    getProductById(id)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        setStatus("ready");
        document.title = `${data.title} · Loopi`;
      })
      .catch((error) => {
        if (!cancelled) setStatus(error.response?.status === 404 ? "not-found" : "error");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const backLink = (
    <Link to="/" className="text-sm text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline">
      ← Back to all products
    </Link>
  );

  if (status === "loading") return <div className="container mx-auto px-4"><StatusMessage title="Loading product…" /></div>;
  if (status === "not-found" || status === "error") {
    return (
      <div className="container mx-auto px-4">
        <StatusMessage
          kind="error"
          title={status === "not-found" ? "This product doesn't exist." : "We couldn't load this product."}
        >
          {backLink}
        </StatusMessage>
      </div>
    );
  }

  const before = originalPrice(product.price, product.discountPercentage);

  return (
    <div className="container mx-auto px-4 py-8">
      {backLink}
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div>
          <img
            src={product.images[mainImage]}
            alt={product.title}
            className="aspect-square w-full rounded-lg bg-gray-100 object-contain"
          />
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setMainImage(index)}
                  aria-label={`Show image ${index + 1} of ${product.images.length}`}
                  aria-pressed={index === mainImage}
                  className={`shrink-0 rounded-md border-2 ${index === mainImage ? "border-gray-900" : "border-transparent opacity-70 hover:opacity-100"}`}
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
            <span className="text-sm text-gray-600">({product.reviews.length} reviews)</span>
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

          <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg border border-gray-200 p-5 text-sm">
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
