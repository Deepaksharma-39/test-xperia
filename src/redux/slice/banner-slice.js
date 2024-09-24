import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  bannerData: null,
  loaded: false,
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.xperiagroup.in/home-banner/all-banners`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {
    updateBanners: (state, action) => {
      state.bannerData = action.payload;
      state.loaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.bannerData = action.payload;
        state.loaded = true;
        state.loading = false;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const bannersReducer = bannersSlice.reducer;
export const { updateBanners } = bannersSlice.actions;
