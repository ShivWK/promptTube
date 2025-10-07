import { createSlice, createSelector } from "@reduxjs/toolkit";

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

                // document.body.style.overflow = "hidden"
            } else if (mode === "open") {
                state.openAuthForm = value;

                // if (!value) {
                //     document.body.style.overflow = "auto"
                // }
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

export const selectUserDetails = createSelector(
    [
        state => state.authSlice.userName,
        state => state.authSlice.userEmail,
        state => state.authSlice.userId,
    ],
    (name, email, id) => ({ name, email, id })
)

export const selectSessionTokens = createSelector(
    [
        state => state.authSlice.accessToken,
        state => state.authSlice.refreshToken
    ],
    (accessToken, refreshToken) => ({
        accessToken,
        refreshToken
    })
)

export const selectToast = createSelector(
    [
        state => state.authSlice.showToast,
        state => state.authSlice.toastMessage,
        state => state.authSlice.toastError,
    ],
    (show, message, error) => ({ show, message, error })
)

export const {
    setLoginStatus,
    setOpenAuthForm,
    setToast,
    setAuthDetails,
} = authSlice.actions;