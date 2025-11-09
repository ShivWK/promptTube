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

export const addVideo = createAsyncThunk("watch/manageVideos", async (payload, { rejectWithValue }) => {
    const { userId, videoId, videoType, method } = payload;
    // console.log("Called", userId, videoId, videoType)
    try {
        const response = await fetch(import.meta.env.VITE_ADD_VIDEO_URL, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId, videoId, videoType
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData)
        }

        const data = await response.json();
        return data;
    } catch (err) {
        return rejectWithValue({
            message: err.message || "Something went wrong while adding video.",
            videoType,
        });
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
                state.liked_videos.push(videoId);
            } else {
                const i = state.liked_videos.indexOf(videoId);
                state.liked_videos.splice(i, 1);
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(addVideo.rejected, (state, action) => {
                const { message, videoType } = action.payload;
                console.log("Video not added", message);

                if (videoType === "history") state.history.pop();
                else if (videoType === "watch-later") state.watch_later.pop();
                else state.liked_videos.pop();
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