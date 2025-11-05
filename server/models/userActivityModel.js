const mongoose = require("mongoose");

const userActivityModel = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },

    videoType: {
        type: String,
        required: true,
    },

    videoId: {
        type: String,
        required: true
    }
})

const UserActivityModel = mongoose.model("UserActivity", userActivityModel);
module.exports = UserActivityModel;