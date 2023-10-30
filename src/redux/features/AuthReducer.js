import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const isLoggedIn = createSlice({
  name: "isLoggedIn",
  initialState,
  reducers: {
    LoginAction: (state) => {
      state.isLoggedIn = true;
    },
    LogoutAction: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { LoginAction, LogoutAction } = isLoggedIn.actions;
export default isLoggedIn.reducer;
