import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
    name: "collectionSlice",
    initialState: {
        showDialog: false,
        toggleCreateCollection: false
    },
    reducers: {
        setShowDialog: (state, action) => {
            state.showDialog = action.payload;
        },
        setToggleCreateCollection: (state, action) => {
            state.toggleCreateCollection = action.payload;
        }
    }
});

export const { setShowDialog, setToggleCreateCollection } = collectionSlice.actions;
export default collectionSlice.reducer;