const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ['new', 'processing', 'shipped', 'delivrerd'],
    default: 'new',
  },
  orderDate: Date,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
