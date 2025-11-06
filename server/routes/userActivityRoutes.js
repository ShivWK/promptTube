const express = require("express");
const userRouter = express.Router();
const { 
    addVideo,
    removeVideo,
    getVideo,
    addSubscription,
    removeSubscription,
    addComment,
    removeComment
 } = require("./../controllers/userActivityController");

userRouter.route("/memoryVideos")
    .get(getVideo)
    .patch(addVideo)
    .delete(removeVideo);

userRouter.route("/subscription")
    .patch(addSubscription)
    .get()
    .delete(removeSubscription);

userRouter.route("/comments")
    .patch(addComment)
    .get()
    .delete(removeComment);

module.exports = userRouter;