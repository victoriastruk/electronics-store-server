const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  rating: Number,
  comment: String,
  date: Date,
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
