const { Router } = require('express');
const { customerController } = require('../controller');

const customerRouter = Router();

customerRouter
  .route('/')
  .get(customerController.getCustomers)
  .post(customerController.createCustomer);

customerRouter
  .route('/:customerId')
  .get(customerController.getCustomerById)
  .patch(customerController.updatedCustomerById)
  .delete(customerController.deleteCustomerById);

module.exports = customerRouter;
