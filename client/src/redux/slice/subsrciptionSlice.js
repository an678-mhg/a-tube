import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkSubSubsrciptionApi,
  getSubsrciptionApi,
  subsrciptionChannelApi,
  unSubsrciptionApi,
} from "../../api/subsrciptionApi";

const initialState = {
  isSubsrciption: false,
  subsrciptCount: 0,
  error: false,
  isCheck: false,
};

export const subsrciptionChannel = createAsyncThunk(
  "sub/subsrciptChannel",
  async (data) => {
    await subsrciptionChannelApi(data);
  }
);

export const checkSubsrciption = createAsyncThunk(
  "sub/checkSubsrcipt",
  async (channelId) => {
    const res = await checkSubSubsrciptionApi(channelId);
    return res.data;
  }
);

export const unSubsrciption = createAsyncThunk(
  "sub/unSubsrciption",
  async (channelId) => {
    await unSubsrciptionApi(channelId);
  }
);

export const getSubsrciption = createAsyncThunk(
  "sub/getSubsrciption",
  async (channelId) => {
    const res = await getSubsrciptionApi(channelId);
    return res.data;
  }
);

const subsrciptionSlice = createSlice({
  name: "sub",
  initialState,
  reducers: {
    setSubsrciptions: (state, action) => {
      state.isSubsrciption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(subsrciptionChannel.pending, (state) => {
      state.isSubsrciption = true;
      state.subsrciptCount += 1;
    });
    builder.addCase(subsrciptionChannel.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(subsrciptionChannel.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(checkSubsrciption.pending, (state) => {
      state.isCheck = true;
    });
    builder.addCase(checkSubsrciption.fulfilled, (state, action) => {
      state.isSubsrciption = action.payload.isSubsrciption;
      state.isCheck = false;
    });
    builder.addCase(unSubsrciption.pending, (state) => {
      state.isSubsrciption = false;
      state.subsrciptCount -= 1;
    });
    builder.addCase(unSubsrciption.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(unSubsrciption.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(getSubsrciption.fulfilled, (state, action) => {
      state.subsrciptCount = action.payload.subsrciptCount;
    });
  },
});

export const { setSubsrciptions } = subsrciptionSlice.actions;

export default subsrciptionSlice.reducer;
