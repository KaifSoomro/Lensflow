import { createSlice } from "@reduxjs/toolkit";

const collectionSlice = createSlice({
    name: "collectionSlice",
    initialState: {
        showDialog: false
    },
    reducers: {
        setShowDialog: (state, action) => {
            state.showDialog = action.payload;
        }
    }
});

export const { setShowDialog } = collectionSlice.actions;
export default collectionSlice.reducer;