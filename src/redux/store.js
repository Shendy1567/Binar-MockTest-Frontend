import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/AuthReducer";

export const store = configureStore({
  reducer: {
    authreducer: AuthReducer,
  },
});
