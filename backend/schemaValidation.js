const Joi = require("joi");

// Validation schema check
const studentSchema = Joi.object({
  name: Joi.string().min(2).max(25).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(10).max(100).required(),
  course: Joi.string().required(),
});

module.exports = { studentSchema };
