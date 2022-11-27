import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllVideosApi, getVideoSubsrciptionApi } from "../../api/videoApi";

const initialState = {
  data: [],
  totalPage: 0,
  error: false,
};

export const getVideoHomePage = createAsyncThunk(
  "infinity/getHomePage",
  async (page) => {
    const res = await getAllVideosApi(page);
    return res.data;
  }
);

export const getVideoSubsrciption = createAsyncThunk(
  "infinity/getVideoSubsrciption",
  async (page) => {
    const res = await getVideoSubsrciptionApi(page);
    return res.data;
  }
);

const infinityLoadSlice = createSlice({
  name: "infinity",
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
      state.totalPage = 0;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ({ type }) =>
          type.startsWith("infinity") && type.endsWith("/fulfilled"),
        (state, action) => {
          state.data = [...state.data, ...action.payload.videos];
          state.loading = false;
          state.totalPage = action.payload.totalPage;
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith("infinity") && type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
          state.data = [];
          state.error = true;
        }
      );
  },
});

export const { clearData } = infinityLoadSlice.actions;

export default infinityLoadSlice.reducer;
