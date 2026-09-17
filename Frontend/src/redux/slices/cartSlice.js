import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const messageFrom = (error) =>
  error.response?.data?.message || error.message || "Something went wrong with your cart";

export const fetchCart = createAsyncThunk("cart/fetch", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/v1/eats/cart/get-cart");
    return data.data;
  } catch (error) {
    // A missing cart is a normal empty-cart state.
    if (error.response?.status === 404) return null;
    return rejectWithValue(messageFrom(error));
  }
});

export const addCartItem = createAsyncThunk(
  "cart/addItem",
  async ({ foodItemId, restaurantId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/v1/eats/cart/add-to-cart", {
        foodItemId,
        restaurantId,
        quantity,
      });
      return data.cart;
    } catch (error) {
      return rejectWithValue(messageFrom(error));
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async ({ foodItemId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/v1/eats/cart/update-cart-item", {
        foodItemId,
        quantity,
      });
      return data.cart;
    } catch (error) {
      return rejectWithValue(messageFrom(error));
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (foodItemId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete("/v1/eats/cart/delete-cart-item", {
        data: { foodItemId },
      });
      return data.cart || null;
    } catch (error) {
      return rejectWithValue(messageFrom(error));
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: null, loading: false, updating: false, error: null },
  reducers: {
    clearCartError: (state) => { state.error = null; },
    resetCart: (state) => { state.cart = null; state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
      .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addMatcher(
        (action) => [addCartItem.pending.type, updateCartItem.pending.type, removeCartItem.pending.type].includes(action.type),
        (state) => { state.updating = true; state.error = null; }
      )
      .addMatcher(
        (action) => [addCartItem.fulfilled.type, updateCartItem.fulfilled.type, removeCartItem.fulfilled.type].includes(action.type),
        (state, action) => { state.updating = false; state.cart = action.payload; }
      )
      .addMatcher(
        (action) => [addCartItem.rejected.type, updateCartItem.rejected.type, removeCartItem.rejected.type].includes(action.type),
        (state, action) => { state.updating = false; state.error = action.payload; }
      );
  },
});

export const { clearCartError, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
