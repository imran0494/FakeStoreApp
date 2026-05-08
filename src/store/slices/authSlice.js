import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api/authApi";
import {
  saveTokens,
  clearTokens,
  getAccessToken,
  saveUsername,
} from "../../utils/tokenStorage";
import axios from "axios";

// Login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username,
        password,
      });
      const accessToken = response.data.token;
      const refreshToken = "refresh_" + accessToken;
      await saveTokens(accessToken, refreshToken);
      await saveUsername(username);
      return { accessToken, refreshToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Login failed.",
      );
    }
  },
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, thunkAPI) => {
    try {
      const token = await getAccessToken();
      return { accessToken: token };
    } catch (error) {
      return thunkAPI.rejectWithValue("No token found");
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await clearTokens();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isCheckingAuth: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
          state.isAuthenticated = true;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isCheckingAuth = false;
        state.isAuthenticated = false;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
