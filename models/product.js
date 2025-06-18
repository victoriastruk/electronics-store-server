const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  description: String,
  category: {
    type: String,
    enum: [
      'computers & tables',
      'cell phones',
      'headphones',
      'tech accessories',
    ],
  },
  price: Number,
  stock: Number,
  discount: {
    percentage: Number,
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
