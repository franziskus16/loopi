import axios from "axios";

const api = axios.create({ baseURL: "https://dummyjson.com" });

const LIST_FIELDS = "title,price,discountPercentage,rating,category,thumbnail";

/** All products (the API returns only 30 unless you ask for limit=0). */
export const getAllProducts = async () => {
  const { data } = await api.get("/products", {
    params: { limit: 0, select: LIST_FIELDS },
  });
  return data.products;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};
