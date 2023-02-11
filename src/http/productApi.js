import { $authHost, $host } from "./index";

export const createProduct = async (product) => {
  console.log(product);
  const { data } = await $authHost.post("api/product", product);
  return data;
};

export const fetchProducts = async (typeId, brandId, page, limit) => {
  const { data } = await $host.get("api/product", {
    params: { typeId, brandId, page, limit },
  });
  return data;
};

export const fetchOneProduct = async (id) => {
  const { data } = await $host.get("api/product/" + id);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await $authHost.put("api/product/" + id, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await $authHost.delete("api/product/" + id);
  return data;
};
