const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },

    videoId: {
        type: String,
        required: true
    },

    comment: {
        type: [String],
        default: []
    }
})

const CommentsModel = mongoose.model("Comments", commentsSchema);
module.exports = CommentsModel;