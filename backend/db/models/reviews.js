const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products',
        required : true,
    },
    buyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true,
    },
    review : {
        type : String,
        required : true,
    },
});

module.exports = mongoose.model('reviews', reviewSchema);