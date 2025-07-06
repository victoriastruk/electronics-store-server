const bcrypt = require('bcrypt');
const _ = require('lodash');
const createHttpError = require('http-errors');
const { Customer } = require('../models');

const HASH_SALT = 10;

module.exports.createCustomer = async (req, res, next) => {
  const { body } = req;

  try {
    const hashedPassword = await bcrypt.hash(body.password, HASH_SALT);
    body.password = hashedPassword;
    const createdCustomer = await Customer.create(body);

    const preparedCustomer = _.omit(createdCustomer.toObject(), ['password']);
    res.status(201).send({ data: preparedCustomer });
  } catch (err) {
    next(err);
  }
};

module.exports.getCustomers = async (req, res, next) => {
  const { limit = 10, skip = 0 } = req.query;

  try {
    const foundCustomers = await Customer.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skip)
      .select('-password');

    res.status(200).send({ data: foundCustomers });
  } catch (err) {
    next(err);
  }
};

module.exports.getCustomerById = async (req, res, next) => {
  const { customerId } = req.params;

  try {
    const foundCustomer = await Customer.findById(customerId).select(
      '-password'
    );

    if (!foundCustomer) {
      return next(createHttpError(404, 'Customer Not Found'));
    }

    res.status(200).send({ data: foundCustomer });
  } catch (err) {
    next(err);
  }
};

module.exports.updatedCustomerById = async (req, res, next) => {
  const {
    params: { customerId },
    body,
  } = req;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedCustomer) {
      return next(createHttpError(404, 'Customer Not Found'));
    }

    res.status(200).send({ data: updatedCustomer });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCustomerById = async (req, res, next) => {
  const { customerId } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return next(createHttpError(404, 'Customer Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports.addToWishlist = async (req, res, next) => {
  const {
    body: { productId },
    params: { customerId },
  } = req;
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { $addToSet: { wishlist: productId } },
      { new: true }
    )
      .populate({ path: 'wishlist', select: ['-__v', '-reviews'] })
      .select(['-password', '-__v']);

    if (!updatedCustomer) {
      return next(createHttpError(404, 'Customer Not Found'));
    }
    res.status(200).send({ data: updatedCustomer });
  } catch (err) {
    next(err);
  }
};
