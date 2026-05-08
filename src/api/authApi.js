import axios from "axios";

export const loginApi = async (username, password) => {
  const response = await axios.post("https://fakestoreapi.com/auth/login", {
    username,
    password,
  });
  return response.data;
};
