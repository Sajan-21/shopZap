const { error_function, success_function } = require("../utils/response-handler");
const users = require('../db/models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

exports.signUp = async function(req, res) {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name) {
            return res.status(400).send(error_function({
                success: false,
                statusCode: 400,
                message: "Name is required"
            }));
        }

        if (!email) {
            return res.status(400).send(error_function({
                success: false,
                statusCode: 400,
                message: "Email is required"
            }));
        }

        const checkEmail = await users.findOne({ email });
        if (checkEmail) {
            return res.status(400).send(error_function({
                success: false,
                statusCode: 400,
                message: "This email already exists. Try Login"
            }));
        }

        if (!password) {
            return res.status(400).send(error_function({
                success: false,
                statusCode: 400,
                message: "Password is required"
            }));
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        if (!role) {
            return res.status(400).send(error_function({
                success: false,
                statusCode: 400,
                message: "Role is required"
            }));
        }

        if (role !== "Seller" && role !== "Buyer") {
            return res.status(400).send(error_function({
                success: false,
                statusCode: 400,
                message: "Invalid role. Please select either 'Seller' or 'Buyer'"
            }));
        }

        if(role === "Seller" && !req.body.brandName ){
            return res.status(400).json({
                success : false,
                statusCode : 400,
                message : "please enter your Brand's name",
            });
        }

        const createdAt = Date.now();

        const userData = { ...req.body, password: hashedPassword, permission: true, createdAt, profit : 0 };
        const user = await users.create(userData);

        const token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });

        return res.status(200).send(success_function({
            success: true,
            statusCode: 200,
            message: "Successfully registered",
            data: { token, _id: user._id, role: user.role }
        }));

    } catch (error) {
        console.error("Error during sign-up:", error);
        return res.status(400).send(error_function({
            success: false,
            statusCode: 400,
            message: error.message || error
        }));
    }
}

exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: email ? "Password is required" : "Email is required",
            });
        }

        const user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password, try again",
            });
        }

        if (!user.permission && user.role !== "Admin") {
            return res.status(400).json({
                success: false,
                message: "You are blocked by admin",
            });
        }

        const token = jwt.sign({ user_id: user._id }, process.env.PRIVATE_KEY, { expiresIn: "10d" });

        return res.status(200).json({
            success: true,
            data: {
                token,
                _id: user._id,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
}

exports.forgotPassword = async function(req, res) {
    try {
        let email = req.body.email;
        if(!email){
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "email required"
            });
            res.status(response.statusCode).send(response);
            return;
        }else{
            let user = users.findOne({ email });
            if(!user){
                let response = error_function({
                    success : false,
                    statusCode : 400,
                    message : "User not found in this email"
                });
                res.status(response.statusCode).send(response);
                return;
            }else{
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                await users.findOneAndUpdate({ email : body.email },{ otp, otpExpires : new Date(Date.now() + 5 * 60 * 1000) },{ upsert: true, new: true });
                // sendEmail
                console.log(otp);
                let response = success_function({
                    success : true,
                    statusCode : 200,
                    message : "we send an OTP to your email, verify the otp and reset the password through the reset link"
                });
                res.status(response.statusCode).send(response);
                return;
            }
        }

    } catch (error) {
        console.log("error : ",error);
        let response = error_function({
            success : false,
            statusCode : 400,
            message : error.message ? error.message : error
        });
        res.status(response.statusCode).send(response);
        return;
    }
}

exports.resetPassword = async function(req, res) {
    try {
        let { newPassword, confirmPassword } = req.body;

        if(newPassword !== confirmPassword) {
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "password confirmation failed"
            });
            res.status(response.statusCode).send(response);
            return;
        }else{
            let salt = bcrypt.genSaltSync(10);
            let password = bcrypt.hashSync(password, salt);

            await users.updateOne({email : req.params.email}, {$set : {password}});

            let response = success_function({
                success : true,
                statusCode : 200,
                message : "password reset successfully"
            });
            res.status(response.statusCode).send(response);
            return;
        }
    } catch (error) {
        console.log("error : ",error);
        res.status(200).json({
            success : false,
            statusCode : 500,
            message : error.message ? error.message : error
        });
        return;
    }
}