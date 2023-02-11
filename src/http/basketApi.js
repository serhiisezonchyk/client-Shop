import { $host } from "./index";

export const createBasketProduct = async (product) => {
  const { data } = await $host.post("api/basket", product);
  return data;
};

export const fetchBasketProduct = async (userId, page, limit = 5) => {
  const { data } = await $host.get("api/basket", {
    params: { userId, page, limit },
  });
  return data;
};

export const deleteBasketProduct = async (productId, userId) => {
  const { data } = await $host.delete("api/basket/" + productId, {
    params: { userId },
  });
  return data;
};

export const fetchOneBasketProduct = async (productId, userId) => {
  const { data } = await $host.get("api/basket/" + productId, {
    params: { userId },
  });
  return data;
};
