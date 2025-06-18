const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    country: String,
  },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
