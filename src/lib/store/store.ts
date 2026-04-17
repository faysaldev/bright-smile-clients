import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
