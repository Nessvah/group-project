const validationMiddleware = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);

    // if some data fails to validate
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    // if everything is fine it can proceed
    next();
  };
};

module.exports = { validationMiddleware };
