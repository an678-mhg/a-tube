import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkLikeApi,
  getVideoByIdApi,
  likeVideoApi,
  unLikeApi,
  disLikeVideoApi,
  checkDisLikeVideoApi,
  unDisLikeApi,
} from "../../api/videoApi";

const initialState = {
  video: {},
  loading: false,
  videoRecomment: [],
  likeCount: 0,
  disLikeCount: 0,
  isLike: false,
  isDisLike: false,
  error: false,
};

export const getVideoById = createAsyncThunk("video/getById", async (id) => {
  const res = await getVideoByIdApi(id);
  return res.data;
});

export const likeVideo = createAsyncThunk("video/likeVideo", async (data) => {
  await likeVideoApi(data);
});

export const checkLike = createAsyncThunk(
  "video/check-like",
  async (videoId) => {
    const res = await checkLikeApi(videoId);
    return res.data;
  }
);

export const unLike = createAsyncThunk("video/un-like", async (videoId) => {
  await unLikeApi(videoId);
});

export const disLikeVideo = createAsyncThunk("video/dislike", async (data) => {
  await disLikeVideoApi(data);
});

export const checkDisLikeVideo = createAsyncThunk(
  "video/checkDislike",
  async (videoId) => {
    const res = await checkDisLikeVideoApi(videoId);
    return res.data;
  }
);

export const unDisLikeVideo = createAsyncThunk(
  "video/unDisLikeVideo",
  async (videoId) => {
    await unDisLikeApi(videoId);
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    clearVideo: (state) => {
      state.video = {};
      state.loading = false;
      state.videoRecomment = [];
      state.likeCount = 0;
      state.disLikeCount = 0;
      state.isLike = false;
      state.isDisLike = false;
      state.error = false;
    },
    setIsLike: (state, action) => {
      state.isLike = action.payload;
    },
    setIsDisLike: (state, action) => {
      state.isDisLike = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVideoById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideoById.fulfilled, (state, action) => {
      state.video = action.payload.video;
      state.loading = false;
      state.videoRecomment = action.payload.videoRecomment;
      state.likeCount = action.payload.likeCount;
      state.disLikeCount = action.payload.disLikeCount;
    });
    builder.addCase(getVideoById.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(likeVideo.pending, (state) => {
      state.isLike = true;
      state.likeCount += 1;
    });
    builder.addCase(likeVideo.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(likeVideo.rejected, (state) => {
      state.isLike = false;
      state.error = true;
    });
    builder.addCase(checkLike.fulfilled, (state, action) => {
      state.isLike = action.payload.isLike;
    });
    builder.addCase(checkLike.rejected, (state) => {
      state.isLike = false;
    });
    builder.addCase(unLike.pending, (state) => {
      state.isLike = false;
      state.likeCount -= 1;
    });
    builder.addCase(unLike.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(unLike.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(disLikeVideo.pending, (state) => {
      state.isDisLike = true;
      state.disLikeCount += 1;
    });
    builder.addCase(disLikeVideo.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(disLikeVideo.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(checkDisLikeVideo.fulfilled, (state, action) => {
      state.isDisLike = action.payload.isDisLike;
    });
    builder.addCase(checkDisLikeVideo.rejected, (state) => {
      state.isDisLike = false;
    });
    builder.addCase(unDisLikeVideo.pending, (state) => {
      state.isDisLike = false;
      state.disLikeCount -= 1;
    });
    builder.addCase(unDisLikeVideo.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(unDisLikeVideo.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { clearVideo, setIsLike, setIsDisLike } = videoSlice.actions;

export default videoSlice.reducer;
