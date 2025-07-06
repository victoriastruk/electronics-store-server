const createHttpError = require('http-errors');
const { Order } = require('../models');

module.exports.createOrder = async (req, res, next) => {
  const { body } = req;

  try {
    const createdOrder = await Order.create(body);
    res.status(201).send({ data: createdOrder });
  } catch (err) {
    next(err);
  }
};

module.exports.getOrders = async (req, res, next) => {
  const { limit = 10, skip = 0 } = req.query;

  try {
    const foundOrders = await Order.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skip);

    res.status(200).send({ data: foundOrders });
  } catch (err) {
    next(err);
  }
};

module.exports.getOrderById = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const foundOrder = await Order.findById(orderId);
    if (!foundOrder) {
      return next(createHttpError(404, 'Order Not Found'));
    }

    res.status(200).send({ data: foundOrder });
  } catch (err) {
    next(err);
  }
};

module.exports.updatedOrderById = async (req, res, next) => {
  const {
    params: { orderId },
    body,
  } = req;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return next(createHttpError(404, 'Order Not Found'));
    }

    res.status(200).send({ data: updatedOrder });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteOrderById = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return next(createHttpError(404, 'Order Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
