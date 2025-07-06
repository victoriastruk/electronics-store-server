const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      'computers & tables',
      'cell phones',
      'headphones',
      'tech accessories',
    ],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    percentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    validUntil: Date,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
