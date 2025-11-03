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
    isEmailVerified: false,
    userId: null,
    accessToken: null,
    refreshToken: null,
    openEmailVerification: false,
    showEmailVerification: false,
}

const authSlice = createSlice({
    name: "auth",
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
            const { name, email, emailVerification, userId, accessT, refreshT, } = action.payload;

            state.userName = name;
            state.userEmail = email;
            state.isEmailVerified = emailVerification;
            state.userId = userId;
            state.accessToken = accessT;
            state.refreshToken = refreshT;
        },

        setEmailVerification: (state, action) => {
            const { mode, value } = action.payload;

            if ( mode === "All") {
                state.openEmailVerification = value;
                state.showEmailVerification = value;
            } else if (mode === "open") {
                state.openEmailVerification = value;
            } else if (mode === "slide") {
                state.showEmailVerification = value;
            }
        }

    }
});

export default authSlice.reducer;

export const selectLoggedInStatus = (state) => state.auth.isLoggedIn;
export const selectOpenAuthFrom = (state) => state.auth.openAuthForm;
export const selectSlideAuthForm = (state) => state.auth.slideOpenAuthForm;

export const selectUserDetails = createSelector(
    [
        state => state.auth.userName,
        state => state.auth.userEmail,
        state => state.auth.isEmailVerified,
        state => state.auth.userId,
    ],
    (name, email, isEmailVerified, id) => ({ name, email, isEmailVerified, id })
)

export const selectSessionTokens = createSelector(
    [
        state => state.auth.accessToken,
        state => state.auth.refreshToken
    ],
    (accessToken, refreshToken) => ({
        accessToken,
        refreshToken
    })
)

export const selectToast = createSelector(
    [
        state => state.auth.showToast,
        state => state.auth.toastMessage,
        state => state.auth.toastError,
    ],
    (show, message, error) => ({ show, message, error })
)

export const selectEmailVerification = createSelector(
    [
        state => state.auth.openEmailVerification,
        state => state.auth.showEmailVerification,
    ],
    ( openEmailVerification, showEmailVerification) => ({
        openEmailVerification,
        showEmailVerification
    })
)

export const {
    setLoginStatus,
    setOpenAuthForm,
    setEmailVerification,
    setToast,
    setAuthDetails,
} = authSlice.actions;