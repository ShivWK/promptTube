import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthSliceReducer from "../features/authSlice";
import homeApiSlice from "../features/home/homeApiSlice";
import homeSliceReducer from "../features/home/homeSlice";

const store = configureStore({
    reducer: {
        [homeApiSlice.reducerPath] : homeApiSlice.reducer,
        authSlice: AuthSliceReducer,
        home: homeSliceReducer
    },

    middleware: (defaultMiddlewares) => [
        ...defaultMiddlewares(),
        homeApiSlice.middleware
    ] 
});

setupListeners(store.dispatch)

export default store;