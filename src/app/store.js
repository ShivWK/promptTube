import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthSliceReducer from "../features/auth/authSlice";
import homeApiSlice from "../features/home/homeApiSlice";
import homeSliceReducer from "../features/home/homeSlice";
import watchApiSlice from "../features/watch/watchApiSlice";
import watchSliceReducer from "../features/watch/watchSlice";
import searchSliceReducer from "../features/search/searchSlice";
import userActivityReducer from "../features/userActivity/userActivitySlice";
import { logger } from "../features/watch/watchSlice";

const store = configureStore({
    reducer: {
        [homeApiSlice.reducerPath] : homeApiSlice.reducer,
        [watchApiSlice.reducerPath] : watchApiSlice.reducer,
        auth: AuthSliceReducer,
        home: homeSliceReducer,
        watch: watchSliceReducer,
        search: searchSliceReducer,
        userActivity: userActivityReducer,
    },

    middleware: (defaultMiddlewares) => [
        ...defaultMiddlewares(),
        homeApiSlice.middleware,
        watchApiSlice.middleware,
    ] 
});

setupListeners(store.dispatch)

export default store;