import { createSlice } from "@reduxjs/toolkit";

const dynamicRouteSlice = createSlice({
    name: "dynamicRouteSlice",
    initialState: {
        paragraph: ""
    },
    reducers: {
        setParagraph: (state, action) => {
            state.paragraph = action.payload;
        }
    }
});

export const { setParagraph } = dynamicRouteSlice.actions;
export default dynamicRouteSlice.reducer; 