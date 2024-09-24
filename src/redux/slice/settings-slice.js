import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  settingsData: null,
  loaded: false,
  loading: false,
  error: null,
};

export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.xperiagroup.in/settings/all-settings`);
      return response.data;
    } catch (error) {
      // Capture and return error information
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      state.settingsData = action.payload;
      state.loaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.settingsData = action.payload;
        state.loaded = true;
        state.loading = false;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const settingsReducer = settingsSlice.reducer;
export const { updateSettings } = settingsSlice.actions;
