const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /^\S+@\S+\.\S+$/i
  },
  password: {
    type: String,
    required: true,
    minlength: 5
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
