const express = require("express");
const userRouter = express.Router();
const { getVideo, deleteVideo, updateData } = require("./../controllers/userActivityController");

userRouter.route("/memoryVideos")
    .get(getVideo)
    .patch(updateData)
    .delete(deleteVideo);

// userRouter.route("/subscription")
//     .patch()
//     .get()
//     .delete();

// userRouter.route("/comments")
//     .patch()
//     .get()
//     .delete();

module.exports = userRouter;