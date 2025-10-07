import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    openAuthForm: false,
    slideOpenAuthForm: false,
    showToast: false,
    toastMessage: "",
    toastError: false,
    userName: "",
    userEmail: "",
    userId: null,
    accessToken: null,
    refreshToken: null,
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,

    reducers: {
        setLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload;
        },


        setLoggedInStatus: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        
        setOpenAuthForm: (state, action) => {
            const { mode, value } = action.payload;

            if (mode === "All") {
                state.openAuthForm = value;
                state.slideOpenAuthForm = value;
            } else if (mode === "open") {
                state.openAuthForm = value;
            } else if (mode === "slide") {
                state.slideOpenAuthForm = value;
            }
        },

        setToast: (state, action) => {
            const { message, error, show } = action.payload;

            state.showToast = show;
            state.toastMessage = message;
            state.toastError = error;
        },

        setAuthDetails: (state, action) => {
            const { name, email, userId, accessT, refreshT, } = action.payload;

            state.userName = name;
            state.userEmail = email;
            state.userId = userId;
            state.accessToken = accessT;
            state.refreshToken = refreshT;
        },

    }
});

export default authSlice.reducer;

export const selectLoggedInStatus = (state) => state.authSlice.isLoggedIn;
export const selectOpenAuthFrom = (state) => state.authSlice.openAuthForm;
export const selectSlideAuthForm = (state) => state.authSlice.slideOpenAuthForm;

export const {
    setLoginStatus,
    setOpenAuthForm,
    setToast,
    setAuthDetails,
} = authSlice.actions;