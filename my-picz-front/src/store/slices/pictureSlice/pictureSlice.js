import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photoInfo: {
    name: "",
    title: "",
    description: "",
    linkedTo: [],
  },
  photos: [],
};

export const pictureSlice = createSlice({
  name: "picture",
  initialState,
  reducers: {
    pictureInfo: (state, { payload }) => {
      state.photoInfo.name = payload.name;
      state.photoInfo.title = payload.title;
      state.photoInfo.description = payload.description;
    },
    clearPictureInfo: (state) => {
      state.photoInfo.name = "";
      state.photoInfo.title = "";
      state.photoInfo.description = "";
      state.photoInfo.linkedTo = [];
    },
    allPictures: (state, { payload }) => {
      state.photos = payload;
    },
  },
});

export const { pictureInfo, clearPictureInfo, allPictures } =
  pictureSlice.actions;

export default pictureSlice.reducer;
