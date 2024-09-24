import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  serviceData: null,
  loaded: false,
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.xperiagroup.in/services/all-services`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    updateServices: (state, action) => {
      state.serviceData = action.payload;
      state.loaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.serviceData = action.payload;
        state.loaded = true;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const servicesReducer = servicesSlice.reducer;
export const { updateServices } = servicesSlice.actions;
