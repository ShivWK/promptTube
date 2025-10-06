import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,

    reducers: {
        setLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    }
});

export default authSlice.reducer;

export const selectLoggedInStatus = (state) => state.authSlice.isLoggedIn;

export const {
    setLoginStatus
} = authSlice.actions;