const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatPrice = (value) => currency.format(value);

/**
 * DummyJSON gives the discount as a percentage; this recovers the original price.
 * Discounts under 1% are ignored, since the "was" price would look the same.
 */
export const originalPrice = (price, discountPercentage) =>
  discountPercentage >= 1 ? price / (1 - discountPercentage / 100) : null;

/** "beauty" → "Beauty", "home-decoration" → "Home decoration" */
export const formatCategory = (slug) => {
  const text = slug.replace(/-/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
};
