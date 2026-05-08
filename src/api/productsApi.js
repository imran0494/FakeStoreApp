import axiosInstance from "./axiosInstance";

export const fetchProductsApi = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const fetchProductByIdApi = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};
