exports.asyncErrorHandler = (func) => (req, res, next) => {
    func(req, res, next)
        .catch(err => {
            console.log("Failed", err);

            return res.status(500).json({
                status: "failed",
                message: err.message || "Something went wrong."
            })
        })
}

exports.requiredFieldsCheck = ({ args, res }) => {
    for (let param of args) {
        if (!param) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide required fields"
            })
        }
    }
}