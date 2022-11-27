import { createSlice } from "@reduxjs/toolkit";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  currentUser: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logOut: (state) => {
      state.currentUser = null;
      localStorage.setItem("token", null);
      localStorage.setItem("a-tube-history", null);
      setAuthToken(null);
    },
  },
});

export const { addUser, logOut } = authSlice.actions;

export default authSlice.reducer;
