const UserActivityModel = require("./../models/userActivityModel");
const { asyncErrorHandler, requiredFieldsCheck } = require("./../utils/wrapper");

exports.updateData = asyncErrorHandler(async (req, res) => {
    const { userId, videoId, videoType } = req.body;

    // if (!userId || !videoId || !videoType) {
    //     return res.status(400).json({
    //         status: "failed",
    //         message: "Please provide required fields"
    //     })
    // }

    requiredFieldsCheck({ args: [userId, videoId, videoType], res })

    const response = await UserActivityModel.findOneAndUpdate(
        { userId, videoType },
        { $addToSet: { videoId } },
        { new: true, upsert: true }
    );

    return res.status(200).json({
        status: "success",
        data: response
    })
})

exports.getVideo = asyncErrorHandler(async (req, res) => {
    const { userId } = req.body;

    requestIdleCallback({args: [userId], res})

    const response = await UserActivityModel.find({ userId });

    return res.status(200).json({
        status: "failed",
        data: response,
    })
})

exports.deleteVideo = async (req, res) => {
    try {

    } catch (err) {

    }
}