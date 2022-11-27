import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addVideoFavouriteApi,
  getVideoFavouriteApi,
} from "../../api/videoFavouriteApi";

const initialState = {
  videos: [],
  loading: false,
  error: false,
};

export const addVideoFavourite = createAsyncThunk(
  "favourite/addVideo",
  async (data) => {
    const res = await addVideoFavouriteApi({ videoId: data._id });
    return res.data;
  }
);

export const getVideoFavourite = createAsyncThunk(
  "favourite/getVideo",
  async () => {
    const res = await getVideoFavouriteApi();
    return res.data;
  }
);

const videoFavouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addVideoFavourite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addVideoFavourite.fulfilled, (state, action) => {
      state.loading = false;
      state.videos.push(action.payload.video);
    });
    builder.addCase(addVideoFavourite.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getVideoFavourite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoFavourite.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(getVideoFavourite.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload.videos;
    });
  },
});

export default videoFavouriteSlice.reducer;
