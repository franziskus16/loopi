// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <Link
    to={`/product/${product.id}`}
    key={product.id}
    className="group relative block overflow-hidden"
  >
    <img
      className="aspect-square w-full rounded-sm object-cover"
      src={product.images[0]}
      alt={product.title}
    />
    <div className="relative border border-gray-100 bg-white p-6">
      <p className="mt-1 text-sm text-gray-700">{product.category}</p>
      <p className="text-gray-700">${product.price}</p>

      <h3 className="mt-1.5 text-lg font-medium text-gray-900">
        {product.title}
      </h3>

      <p className="mt-1.5 line-clamp-3 text-gray-700">{product.description}</p>

      <div className="mt-4">
        <span className="inline-block w-full text-center rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105">
          Learn More
        </span>
      </div>
    </div>
  </Link>
);

export default ProductCard;
