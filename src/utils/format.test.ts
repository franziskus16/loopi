import { formatCategory, formatPrice, originalPrice } from "./format";

describe("format helpers", () => {
  it("formats prices as US dollars", () => {
    expect(formatPrice(1899.99)).toBe("$1,899.99");
  });

  it("recovers the price before the discount", () => {
    expect(originalPrice(90, 10)).toBeCloseTo(100);
  });

  it("ignores discounts under 1%", () => {
    expect(originalPrice(1.49, 0.16)).toBeNull();
  });

  it("turns category slugs into labels", () => {
    expect(formatCategory("kitchen-accessories")).toBe("Kitchen accessories");
  });
});
