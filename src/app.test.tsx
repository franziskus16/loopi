import { screen, waitFor, within } from "@testing-library/react";
import { AxiosError, AxiosHeaders } from "axios";
import { getAllProducts, getProductById } from "./services/api";
import fixtures from "./test/fixtures.json";
import { renderApp } from "./test/renderApp";
import type { Product, ProductSummary } from "./types";

vi.mock("./services/api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./services/api")>()),
  getAllProducts: vi.fn(),
  getProductById: vi.fn(),
}));

const products = fixtures.list.products as ProductSummary[];
const mascara = fixtures.detail as Product;

const notFound = () =>
  new AxiosError("Not found", "ERR_BAD_REQUEST", undefined, undefined, {
    status: 404,
    statusText: "Not Found",
    headers: {},
    config: { headers: new AxiosHeaders() },
    data: {},
  });

beforeEach(() => {
  vi.mocked(getAllProducts).mockResolvedValue(products);
  vi.mocked(getProductById).mockResolvedValue(mascara);
});

describe("product list", () => {
  it("shows every product with its price", async () => {
    renderApp("/");
    expect(await screen.findByText("12 products")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(12);
    expect(screen.getByText("$1,899.99")).toBeInTheDocument();
  });

  it("combines search and category, and clears both", async () => {
    const { user } = renderApp("/");
    await screen.findByText("12 products");

    await user.selectOptions(screen.getByLabelText("Category"), "groceries");
    expect(screen.getByText("3 products")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Search"), "lem");
    expect(screen.getByText("1 product")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Lemon/ })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getByText("12 products")).toBeInTheDocument();
  });

  it("says when nothing matches", async () => {
    const { user } = renderApp("/");
    await screen.findByText("12 products");
    await user.type(screen.getByLabelText("Search"), "zzz");
    expect(screen.getByText("No products match your search.")).toBeInTheDocument();
  });

  it("offers a retry when the API fails", async () => {
    vi.mocked(getAllProducts).mockRejectedValueOnce(new Error("offline"));
    const { user } = renderApp("/");

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("We couldn't load the products.");
    await user.click(within(alert).getByRole("button", { name: "Try again" }));
    expect(await screen.findByText("12 products")).toBeInTheDocument();
  });
});

describe("product page", () => {
  it("shows the product's title, rating and real review count", async () => {
    renderApp("/product/1");
    expect(await screen.findByRole("heading", { level: 1, name: mascara.title })).toBeInTheDocument();
    expect(screen.getByText("Rated 2.6 out of 5")).toBeInTheDocument();
    expect(screen.getByText("(2 reviews)")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: mascara.title })).toBeInTheDocument();
  });

  it("explains when a product doesn't exist", async () => {
    vi.mocked(getProductById).mockRejectedValueOnce(notFound());
    renderApp("/product/9999");
    expect(await screen.findByRole("alert")).toHaveTextContent("This product doesn't exist.");
  });
});

describe("cart", () => {
  it("adds products, updates quantities and places the order", async () => {
    const { user } = renderApp("/product/1");
    await screen.findByRole("heading", { level: 1, name: mascara.title });

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    await user.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(screen.getByText(/Added 2 to your cart/)).toBeInTheDocument();
    expect(screen.getByTestId("cart-count")).toHaveTextContent("2");

    await user.click(screen.getByRole("link", { name: "View cart" }));
    expect(screen.getByRole("heading", { name: "Your cart" })).toBeInTheDocument();
    expect(screen.getByTestId("subtotal")).toHaveTextContent("$19.98");

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(screen.getByTestId("subtotal")).toHaveTextContent("$29.97");

    await user.click(screen.getByRole("button", { name: "Place order" }));
    expect(screen.getByText("Thanks for your order!")).toBeInTheDocument();
    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
  });

  it("keeps the cart after a reload", async () => {
    const first = renderApp("/product/1");
    await screen.findByRole("heading", { level: 1, name: mascara.title });
    await first.user.click(screen.getByRole("button", { name: "Add to cart" }));
    first.unmount();

    renderApp("/cart");
    expect(screen.getByRole("link", { name: mascara.title })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId("cart-count")).toHaveTextContent("1"));
  });

  it("can remove items until it's empty", async () => {
    const first = renderApp("/product/1");
    await screen.findByRole("heading", { level: 1, name: mascara.title });
    await first.user.click(screen.getByRole("button", { name: "Add to cart" }));
    await first.user.click(screen.getByRole("link", { name: "View cart" }));

    await first.user.click(screen.getByRole("button", { name: `Remove ${mascara.title}` }));
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });
});
