const { Router } = require('express');
const { reviewController } = require('../controller');

const reviewRouter = Router();

reviewRouter
  .route('/')
  .get(reviewController.getReviews)
  .post(reviewController.createReview);

reviewRouter
  .route('/:reviewId')
  .get(reviewController.getReviewById)
  .patch(reviewController.updatedReviewById)
  .delete(reviewController.deleteReviewById);

module.exports = reviewRouter;
