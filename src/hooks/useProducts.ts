import { useCallback, useEffect, useState } from "react";
import { getAllProducts, getProductById, isNotFound } from "../services/api";
import type { Product, ProductSummary } from "../types";

type Status = "loading" | "ready" | "error" | "not-found";

/** Loads the whole catalogue and exposes a retry for the error state. */
export function useProducts() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      setProducts(await getAllProducts());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { products, status, retry: load };
}

/** Loads one product and ignores responses that arrive after the id has changed. */
export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setStatus("loading");

    getProductById(id)
      .then((data) => {
        if (cancelled) return;
        setProduct(data);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (!cancelled) setStatus(isNotFound(error) ? "not-found" : "error");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, status };
}
