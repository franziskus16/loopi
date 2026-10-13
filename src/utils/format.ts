const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const formatPrice = (value: number): string => currency.format(value);

/**
 * DummyJSON gives the discount as a percentage; this recovers the original price.
 * Discounts under 1% are ignored, since the "was" price would look the same.
 */
export const originalPrice = (price: number, discountPercentage: number): number | null =>
  discountPercentage >= 1 ? price / (1 - discountPercentage / 100) : null;

/** "beauty" → "Beauty", "home-decoration" → "Home decoration" */
export const formatCategory = (slug: string): string => {
  const text = slug.replace(/-/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
};
