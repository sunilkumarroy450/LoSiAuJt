const Joi = require("joi");

const productValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(1).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ message: "Validation Failed, Name or Price is required", error });
  }
  next();
};
module.exports = { productValidation };
