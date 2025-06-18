const { Router } = require('express');
const { orderController } = require('../controller');

const orderRouter = Router();

orderRouter
  .route('/')
  .get(orderController.getOrders)
  .post(orderController.createOrder);

orderRouter
  .route('/:orderId')
  .get(orderController.getOrderById)
  .patch(orderController.updatedOrderById)
  .delete(orderController.deleteOrderById);

module.exports = orderRouter;