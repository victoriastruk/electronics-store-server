const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
