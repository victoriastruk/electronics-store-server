const createHttpError = require('http-errors');
const { Product, Review } = require('../models');

module.exports.createProduct = async (req, res, next) => {
  const { body } = req;
  try {
    const createdProduct = await Product.create(body);
    res.status(201).send({ data: createdProduct });
  } catch (err) {
    next(err);
  }
};

module.exports.getProducts = async (req, res, next) => {
  const { limit = 10, page = 1, sort = 'price', category } = req.query;
  const skip = (page - 1) * limit;
  const filter = {};
  if (category) {
    filter.category = category;
  }
  try {
    const foundProducts = await Product.find(filter)
      .select('-__v')
      .populate({ path: 'reviews', select: ['-__v'] })
      .sort({ [sort]: 1 })
      .limit(limit)
      .skip(skip);
    res.status(200).send({ data: foundProducts });
  } catch (err) {
    next(err);
  }
};

module.exports.getProductById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findById(productId)
      .populate({
        path: 'reviews',
        select: ['-__v', '-product'],
        populate: {
          path: 'customer',
          select: 'name',
        },
      })
      .select('-__v');
    if (!foundProduct) {
      return next(createHttpError(404, 'Product Not Found'));
    }
    res.status(200).send({ data: foundProduct });
  } catch (err) {
    next(err);
  }
};

module.exports.updatedProductById = async (req, res, next) => {
  const {
    params: { productId },
    body,
  } = req;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return next(createHttpError(404, 'Product Not Found'));
    }

    res.status(200).send({ data: updatedProduct });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteProductById = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports.createProductReview = async (req, res, next) => {
  const {
    body,
    params: { customerId, productId },
  } = req;

  try {
    const createdReview = await Review.create({
      ...body,
      customer: customerId,
      product: productId,
    });

    if (!createdReview) {
      return next(createHttpError(400, 'Failed to create review'));
    }

    await Product.findByIdAndUpdate(productId, {
      $push: { reviews: createdReview._id },
    });

    res.status(201).send({ data: createdReview });
  } catch (err) {
    next(err);
  }
};
