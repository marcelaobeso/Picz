import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  albumList: [],
  showAlbumList: false,
  relationships: [],
  relation: {
    id_relation: "",
    id_album: "",
    id_picture: "",
  },
  album: {
    id_album: "",
    name: "",
  },
  validFields: {
    name: true,
    id_album: true,
  },
};

export const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    saveNewAlbum: (state, { payload }) => {
      state.albumList.push(payload);
    },
    setAlbums: (state, { payload }) => {
      state.albumList = payload;
    },
    enableShowAlbums: (state, { payload }) => {
      state.showAlbumList = payload;
    },
    selectedAlbum: (state, { payload }) => {
      state.album.id_album = payload.id_album;
      state.album.name = payload.name;
    },
    albumNameValidator: (state, { payload }) => {
      state.validFields.name = payload;
    },
    albumIdValidator: (state, { payload }) => {
      state.validFields.id_album = payload;
    },
    setRelationships: (state, { payload }) => {
      state.relationships = payload;
    },
  },
});

export const {
  saveNewAlbum,
  setAlbums,
  enableShowAlbums,
  selectedAlbum,
  albumNameValidator,
  albumIdValidator,
  setRelationships,
} = albumSlice.actions;

export default albumSlice.reducer;
