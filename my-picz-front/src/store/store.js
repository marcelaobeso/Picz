import { configureStore } from "@reduxjs/toolkit";
import signUpSlice from "./slices/signUpSlice/signUpSlice";
import alertSlice from "./slices/alertSlice/alertSlice";
import pictureSlice from "./slices/pictureSlice/pictureSlice";
import albumSlice from "./slices/albumSlice/albumSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpSlice,
    alert: alertSlice,
    picture: pictureSlice,
    album: albumSlice,
  },
});
