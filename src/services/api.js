import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export const getAllProducts = () => axios.get(API_URL);
export const getProductById = (id) => axios.get(`${API_URL}/${id}`);
