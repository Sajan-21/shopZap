const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  },
  subCategories: [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'subCategory'
    }
  ],
});

module.exports = mongoose.model('category', categorySchema);