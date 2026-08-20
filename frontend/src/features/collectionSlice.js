import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
  name: "collectionSlice",
  initialState: {
    showDialog: false,
    showEditDialog: false,
    toggleCreateCollection: false,
    photoId: "",
  },
  reducers: {
    setShowDialog: (state, action) => {
      state.showDialog = action.payload;
    },
    setEditShowDialog: (state, action) => {
      state.showEditDialog = action.payload;
    },
    setToggleCreateCollection: (state, action) => {
      state.toggleCreateCollection = action.payload;
    },
    setPhotoId: (state, action) => {
      state.photoId = action.payload;
    },
  },
});

export const {
  setShowDialog,
  setToggleCreateCollection,
  setPhotoId,
  setEditShowDialog,
} = collectionSlice.actions;
export default collectionSlice.reducer;
