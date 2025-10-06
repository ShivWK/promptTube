import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthSliceReducer from "../features/authSlice";

const store = configureStore({
    reducer: {
        authSlice: AuthSliceReducer
    }
});

setupListeners(store.dispatch)

export default store;