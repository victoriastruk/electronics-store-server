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

productRouter
  .route('/:productId/customers/:customerId/reviews')
  .post(productController.createProductReview);

productRouter
  // .route('/:productId/reviews')
  // .get(productController.getReviewsByIdProduct);

module.exports = productRouter;
