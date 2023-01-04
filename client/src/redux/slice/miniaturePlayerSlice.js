import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  currentTime: null,
  videoUrl: null,
  nextVideoId: null,
  videoId: null,
};

const miniaturePlayerSlice = createSlice({
  name: "miniaturePlayer",
  initialState,
  reducers: {
    openMiniaturePlayer: (state, action) => {
      state.isShow = true;
      state.currentTime = action.payload.currentTime;
      state.videoUrl = action.payload.videoUrl;
      state.nextVideoId = action.payload.nextVideoId;
      state.videoId = action.payload.videoId;
    },
    closeMiniaturePlayer: (state, action) => {
      state.isShow = false;
      state.currentTime = action.payload.currentTime;
      state.videoUrl = null;
      state.nextVideoId = null;
      state.videoId = null;
    },
    clearMiniaturePlayer: (state) => {
      state.isShow = false;
      state.currentTime = null;
      state.videoUrl = null;
      state.nextVideoId = null;
      state.videoId = null;
    },
  },
});

export const {
  openMiniaturePlayer,
  closeMiniaturePlayer,
  clearMiniaturePlayer,
} = miniaturePlayerSlice.actions;

export default miniaturePlayerSlice.reducer;
