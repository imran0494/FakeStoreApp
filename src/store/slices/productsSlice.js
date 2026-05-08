import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsApi, fetchProductByIdApi } from "../../api/productsApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const data = await fetchProductsApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products.",
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const data = await fetchProductByIdApi(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product.",
      );
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    selectedProduct: null,
    loading: false,
    error: null,
    searchQuery: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
