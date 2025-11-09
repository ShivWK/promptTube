import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPlaying: {},
    history: [],
    watch_later: [],
    liked_videos: []
}

export const logger = (store) => (next) => (action) => {
    console.log("action", action);
    next(action)
}

// export const fetchProducts = createAsyncThunk("watch/setCurrentPlaying", async (payload , { rejectWithValue, fulfillWithValue, dispatch, getState } ) => {
//     console.log("thunk called")
//     try {
//         const response = await fetch("https://dummyjson.com/products");
//         const data = await response.json();

//         return fulfillWithValue(data);
//     } catch (err) {
//         console.log("Failed to fetch products", err);
//         return rejectWithValue(err);
//     }
// })

export const addVideo = createAsyncThunk("watch/manageVideos" , async (payload, { rejectWithValue }) =>{
    const { userId, videoId, videoType, method } = payload;
    console.log("Caled", userId, videoId, videoType)
    try {
        const response = await fetch("https://prompttube.onrender.com/api/v1/user/memoryVideos", {
            method,
            body: JSON.stringify({
                userId, videoId, videoType
            })
        });

        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Error in fetching", err);
        return rejectWithValue(err);
    }
}) 

const watchSlice = createSlice({
    name: "watch",
    initialState,

    reducers: {
        setCurrentPlaying: (state, action) => {
            state.currentPlaying = action.payload;
        },

        manageHistory: (state, action) => {
            const { mode, videoId } = action.payload;

            if (mode === "add") {
                state.history.push(videoId);
            } else {
                const i = state.history.indexOf(videoId);
                state.history.splice(i, 1);
            }
        },

        manageWatchLater: (state, action) => {
            const { mode, videoId } = action.payload;

            if (mode === "add") {
                state.watch_later.push(videoId);
            } else {
                const i = state.watch_later.indexOf(videoId);
                state.watch_later.splice(i, 1);
            }
        },

        manageLikedVideos: (state, action) => {
            const { mode, videoId } = action.payload;

            if (mode === "add") {
                state.history.push(videoId);
            } else {
                const i = state.history.indexOf(videoId);
                state.history.splice(i, 1);
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(addVideo.fulfilled, (state, action) => {
                console.log("Video added", action.payload)
            })

            .addCase(addVideo.rejected, (state, action) => {
                console.log("Video not added", action.payload)
            })
    }
});

export default watchSlice.reducer;

export const selectCurrentPlaying = state => state.watch.currentPlaying;
export const selectWatchLater = state => state.watch.watch_later;
export const selectHistory = state => state.watch.history;
export const selectLikedVideos = state => state.watch.liked_videos;

export const { 
    setCurrentPlaying,
    manageHistory,
    manageWatchLater,
    manageLikedVideos,
 } = watchSlice.actions;