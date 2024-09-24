import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  teamData: null,
  loaded: false,
  loading: false,
  error: null,
};

export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.xperiagroup.in/teams/all-teams`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    updateTeams: (state, action) => {
      state.teamData = action.payload;
      state.loaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.teamData = action.payload;
        state.loaded = true;
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const teamsReducer = teamSlice.reducer;
export const { updateTeams } = teamSlice.actions;
