import axios from "axios";
import type { Product, ProductSummary } from "../types";

const api = axios.create({ baseURL: "https://dummyjson.com" });

const LIST_FIELDS = "title,price,discountPercentage,rating,category,thumbnail";

/** All products (the API returns only 30 unless you ask for limit=0). */
export const getAllProducts = async (): Promise<ProductSummary[]> => {
  const { data } = await api.get<{ products: ProductSummary[] }>("/products", {
    params: { limit: 0, select: LIST_FIELDS },
  });
  return data.products;
};

export const getProductById = async (id: string | number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

/** True when the API answered 404, so the UI can say "not found" instead of "error". */
export const isNotFound = (error: unknown): boolean =>
  axios.isAxiosError(error) && error.response?.status === 404;
