import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getChannelInfoApi,
  getChannelVideoApi,
  updateUserApi,
} from "../../api/channelApi";
import { deleteVideoApi, editVideoApi } from "../../api/videoApi";

const initialState = {
  profile: {},
  videos: [],
  loading: false,
  error: false,
  totalPage: 0,
};

export const getChannelInfo = createAsyncThunk(
  "channel/profile",
  async (id) => {
    const res = await getChannelInfoApi(id);
    return res.data;
  }
);

export const getChannelVideo = createAsyncThunk(
  "channel/videos",
  async ({ id, page }) => {
    const res = await getChannelVideoApi(id, page);
    return res.data;
  }
);

export const updatedUser = createAsyncThunk("channel/update", async (data) => {
  const res = await updateUserApi(data);
  return res.data;
});

export const deleteVideo = createAsyncThunk(
  "channel/deleteVideo",
  async (id) => {
    await deleteVideoApi(id);
    return id;
  }
);

export const editVideo = createAsyncThunk(
  "channel/editVideo",
  async ({ id, data }) => {
    const res = await editVideoApi(id, data);
    return res.data;
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    clearVideo: (state) => {
      state.videos = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChannelInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChannelInfo.fulfilled, (state, action) => {
      state.profile = action.payload.channel;
      state.loading = false;
    });
    builder.addCase(getChannelInfo.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(getChannelVideo.fulfilled, (state, action) => {
      state.videos = [...state.videos, ...action.payload.videos];
      state.totalPage = action.payload.totalPage;
    });
    builder.addCase(getChannelVideo.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(updatedUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatedUser.fulfilled, (state, action) => {
      state.profile = { ...state.profile, ...action.payload.channel };
      state.loading = false;
    });
    builder.addCase(updatedUser.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(deleteVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVideo.fulfilled, (state, action) => {
      state.videos = state.videos.filter((p) => p._id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deleteVideo.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(editVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editVideo.fulfilled, (state, action) => {
      state.videos = state.videos.map((p) => {
        if (p._id === action.payload.video._id) {
          return action.payload.video;
        }

        return p;
      });
      state.loading = false;
    });
    builder.addCase(editVideo.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { clearVideo } = channelSlice.actions;

export default channelSlice.reducer;
