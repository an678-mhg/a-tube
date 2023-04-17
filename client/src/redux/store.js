import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import channelSlice from "./slice/channelSlice";
import infinityLoadSlice from "./slice/infinityLoadSlice";
import subsrciptionSlice from "./slice/subsrciptionSlice";
import videoFavouriteSlice from "./slice/videoFavouriteSlice";
import videoSlice from "./slice/videoSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    video: videoSlice,
    sub: subsrciptionSlice,
    infinity: infinityLoadSlice,
    favourite: videoFavouriteSlice,
    channel: channelSlice,
  },
});
