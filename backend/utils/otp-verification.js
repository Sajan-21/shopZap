const users = require('../db/models/users');

exports.otpVerification = async function (req, res, next) {
    try {
        let { otp } = req.body;
        let { email } = req.params;

        if (!otp) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "OTP required!!!"
            });
        }

        let user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "User not found"
            });
        }

        if (!user.otpExpires || Date.now() > user.otpExpires.getTime()) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "OTP expired"
            });
        }

        if (otp.toString() !== user.otp.toString()) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Incorrect OTP"
            });
        }

        await users.findOneAndUpdate({ email },{ $set : { otp : null, otpExpires: null }});
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message || "Internal Server Error"
        });
    }
};