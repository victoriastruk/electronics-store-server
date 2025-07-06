const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        min: 0,
      },
    },
  ],
  total: {
    type: Number,
    min: 0,
  },
  status: {
    type: String,
    enum: ['new', 'processing', 'shipped', 'delivered'],
    default: 'new',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
