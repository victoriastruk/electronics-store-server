const mongoose = require('mongoose');

module.exports.mongooseErrorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    return res
      .status(400)
      .send({ title: `Invalid value for ${err.path}: ${err.value}` });
  } else if (err instanceof mongoose.Error.ValidationError) {
    title = 'Validation error';

    const errors = Object.values(err.errors).map((e) => ({
      status: 422,
      title: e.message,
    }));

    return res.status(422).send({ errors });
  } else if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).send({
      errors: [
        {
          status: 409,
          title: `Duplicate value for field ${field}: ${err.keyValue[field]}`,
        },
      ],
    });
  }
  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }

  const status = err.status ?? 500;

  res.status(status).send({
    errors: [
      {
        status,
        title: err.message ?? 'Server Error',
      },
    ],
  });
};
