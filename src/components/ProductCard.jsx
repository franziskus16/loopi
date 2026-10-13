import { Link } from "react-router-dom";
import { formatCategory, formatPrice, originalPrice } from "../utils/format";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  const before = originalPrice(product.price, product.discountPercentage);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-lg"
    >
      <img
        className="aspect-square w-full object-cover transition group-hover:scale-105"
        src={product.thumbnail}
        alt=""
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-sm text-gray-500">{formatCategory(product.category)}</p>
        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
        <Rating value={product.rating} size="size-4" />
        <p className="mt-auto pt-2">
          <span className="text-lg font-semibold text-gray-900">{formatPrice(product.price)}</span>
          {before && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              <span className="sr-only">Was </span>
              {formatPrice(before)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
