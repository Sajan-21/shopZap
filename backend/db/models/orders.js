const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products',
        required : true
    },
    quantity : {
        type : Number,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    paymentMethod : {
        type : String,
    },
    orderStatus : {
        type : String,
    },
    buyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    seller : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    date : {
        type : Date,
        required : true
    }
});

module.exports = mongoose.model('orders', ordersSchema);