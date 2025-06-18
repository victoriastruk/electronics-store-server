const { Router } = require('express');
const { productController } = require('../controller');

const productRouter = Router();

productRouter
  .route('/')
  .get(productController.getProducts)
  .post(productController.createProduct);

productRouter
  .route('/:productId')
  .get(productController.getProductById)
  .patch(productController.updatedProductById)
  .delete(productController.deleteProductById);

module.exports = productRouter;
