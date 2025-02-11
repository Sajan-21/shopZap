const jwt = require('jsonwebtoken');
const controlData = require('../utils/control-data.json');
const users = require('../db/models/users');

exports.accessController = async function(accessType, req, res, next) {
    try {
        if (accessType === "*") {
            return next();
        }

        const allowedRoles = accessType.split(',').map((obj) => controlData[obj]);
        
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(400).send({
                success: false,
                statusCode: 400,
                message: "Invalid token"
            });
        }

        jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    statusCode: 400,
                    message: err.message || err
                });
            }

            const user = await users.findById(decoded.user_id);
            if (!user) {
                return res.status(404).send({
                    success: false,
                    statusCode: 404,
                    message: "User not found"
                });
            }

            const role = user.role;

            if (allowedRoles.includes(role)) {

                if(user.permission == false && user.role !== "Admin"){
                    return res.status(404).send({
                        success: false,
                        statusCode: 404,
                        message: "you are blocked by Admin"
                    });
                }else{
                    next();
                }
            }else {
                return res.status(403).send({
                    success: false,
                    statusCode: 403,
                    message: "Access denied: you are not allowed to use this route"
                });
            }
        });
    } catch (error) {
        console.error("Error in access controller:", error);
        return res.status(500).send({
            success: false,
            statusCode: 500,
            message: error.message || error
        });
    }
}