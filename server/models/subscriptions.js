const mongoose = require("mongoose");

const subscriptionsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },

    videoId: {
        type: [String],
        default: []
    }
})

const SubscriptionsModel = mongoose.model("Subscriptions", subscriptionsSchema);
module.exports = SubscriptionsModel;