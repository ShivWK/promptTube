import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    smartSearchQuery: ""
};

const homeSlice = createSlice({
    name: "ai",
    initialState,

    reducers: {
        setSmartSearchQuery: (state, action) => {
            state.smartSearchQuery = action.payload;
        },
    }
});

export default homeSlice.reducer;

export const selectSmartSearchQuery = (state) => state.ai.smartSearchQuery;
export const { setSmartSearchQuery } = homeSlice.actions;
