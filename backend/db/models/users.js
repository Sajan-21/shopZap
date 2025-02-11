const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    phNumber : {
        type : Number,
    },
    role : {
        type : String,
        required : true,
    },
    brandName : {
        type : String,
    },
    resetPasswordToken : {
        type : String,
    },
    address : [
        {
            houseName : {
                type : String
            },
            street : {
                type : String
            },
            pincode : {
                type : Number
            },
            postalAddress : {
                type : String
            },
            district : {
                type : String,
            },
            State : {
                type : String,
            },
            landMark : {
                type : String,
            }
        }
    ],
    orders : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'products'
        }
    ],
    wishList : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'products'
        }
    ],
    cartList : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'products'
        }
    ],
    otp : {
        type : String
    },
    otpExpires: {
        type: Date,
        index: { expiresAfterSeconds: 300 }
    },
    permission : {
        type : Boolean,
        required : true,
    },
    profit : {
        type : Number,
    },
    createdAt : {
        type : Date,
        required : true,
    }
});

module.exports = mongoose.model('users', usersSchema);