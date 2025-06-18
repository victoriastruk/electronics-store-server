const { Router } = require('express');
const customerRouter = require('./customerRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const reviewRouter = require('./reviewRouter');

const router = Router();

router.use('/customers', customerRouter);
router.use('./products', productRouter);
router.use('/orders', orderRouter);
router.use('/reviews', reviewRouter);

module.exports = router;
