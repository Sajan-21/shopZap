const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    subCategory : {
        type : String,
        required : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    }
});

module.exports = mongoose.model('subCategory', subCategorySchema);