import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    subscriptions: [],
    comments: []
}

export const setSubscription = createAsyncThunk("userActivity/setSubscription", async (payload, { rejectWithValue }) => {
    const { method, userId, channelId } = payload
    try {
        const response = await fetch(import.meta.env.VITE_ADD_SUBSCRIPTION_URL, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                channelId
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        return rejectWithValue({
            message: err.message || "Something went wrong"
        })
    }
});

export const setComment = createAsyncThunk("userActivity/setComments", async (payload, { rejectWithValue }) => {
    const { method, userId, videoId, comment, setCommentState, commentArray } = payload
    try {
        const response = await fetch(import.meta.env.VITE_ADD_COMMENT_URL, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                videoId,
                comment
            })
        })

        if (!response.ok) {
            commentArray.shift();
            setCommentState(commentArray);
            return rejectWithValue("");
        }

        const data = await response.json();
        return data;
    } catch (err) {
        commentArray.shift();
        setCommentState(commentArray);
        return rejectWithValue(err);
    }
});

const userActivitySlice = createSlice({
    name: "userActivity",
    initialState,

    reducers: {
        manageSubscriptions: (state, action) => {
            const { mode, channelId } = action.payload;

            if (mode === "add") {
                state.subscriptions.push(channelId);
            } else {
                const i = state.subscriptions.indexOf(channelId);
                state.subscriptions.splice(i, 1);
            }
        },

        manageComments: (state, action) => {
            const { mode, comment } = action.payload;

            if (mode === "add") {
                state.comments.push(comment);
            } else {
                const i = state.comments.indexOf(comment);
                state.comments.splice(i, 1);
            }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(setSubscription.rejected, (state) => {
                console.log("Subscription not added");
                state.subscriptions.pop();
            })
    }
});

export default userActivitySlice.reducer;

export const selectSubscriptions = state => state.userActivity.subscriptions;
export const selectComments = state => state.userActivity.comments;

export const { manageSubscriptions, manageComments } = userActivitySlice.actions;