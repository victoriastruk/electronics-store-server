const { Router } = require('express');
const customerRouter = require('./customerRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');


const router = Router();

router.use('/customers', customerRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);


module.exports = router;
