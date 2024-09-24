// redux/slice/loading-slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
