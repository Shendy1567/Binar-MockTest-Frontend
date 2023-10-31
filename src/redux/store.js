import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/AuthReducer";
import ListSlice from "./features/ListSlice";

export const store = configureStore({
  reducer: {
    authreducer: AuthReducer,
    listdata: ListSlice,
  },
});
