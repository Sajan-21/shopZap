const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category',
        required : true,
    },
    subCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subCategory',
        required : true,
    },
    images : [
        {
            type : String,
            required : true
        }
    ],
    brand : {
        type : String,
    },
    sellerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    stockCount : {
        type : String,
    },
    avgRating : {
        type : Number,
    },
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'reviews'
        }
    ],
    wishListFlag : {
        type : Boolean,
    },
    cartListFlag : {
        type : Boolean,
    },
    permission : {
        type : Boolean,
        required : true,
    },
    createdAt : {
        type : Date,
        required : true
    },
    updatedAt : {
        type : Date,
    }
});

module.exports = mongoose.model('products', productsSchema);