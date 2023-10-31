import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

const initialState = {
  data: [],
  loading: false,
};

export const fetchLists = createAsyncThunk(
  "users/fetchById",
  async (userId, thunkAPI) => {
    const response = await axios.get(`/api/list/${userId}`);
    return response.data.data;
  }
);

const getListsSlice = createSlice({
  name: "List",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchLists.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default getListsSlice.reducer;
