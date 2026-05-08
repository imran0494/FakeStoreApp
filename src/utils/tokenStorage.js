import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USERNAME_KEY = "username";

export const saveTokens = async (accessToken, refreshToken) => {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
};

export const saveUsername = async (username) => {
  await SecureStore.setItemAsync(USERNAME_KEY, username);
};

export const getUsername = async () => {
  return await SecureStore.getItemAsync(USERNAME_KEY);
};

export const getAccessToken = async () => {
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = async () => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(USERNAME_KEY);
};
