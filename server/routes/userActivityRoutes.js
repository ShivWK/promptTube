const express = require("express");
const userRouter = express.Router();
const { addVideo, getVideo, deleteVideo } = require("./../controllers/userActivityController");

userRouter.route("/memoryVideos")
    .get(getVideo)
    .post(addVideo)
    .delete(deleteVideo);

module.exports = userRouter;