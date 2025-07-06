const mongoose = require('mongoose');
const { Product } = require('../models');
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

orderSchema.pre('save', async function (next) {
  const order = this;

  let total = 0;

  if (order.isModified('items') || order.isNew) {
    const today = new Date();

    for (const item of order.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return next(new Error(`Product ${item.product} not found`));
      }

      let basePrice = product.price ?? 0;
      let finalPrice = basePrice;

      if (
        product.discount &&
        product.discount.percentage &&
        product.discount.validUntil &&
        product.discount.validUntil >= today
      ) {
        const discountPercent = product.discount.percentage;
        finalPrice = basePrice * (1 - discountPercent / 100);
      }

      item.price = finalPrice;

      total += finalPrice * item.quantity;
    }

    order.total = total;
  }

  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
