const Joi = require('joi');

const schemas = {
  '/signin': Joi.object().keys({
    login: Joi.string(),
    password: Joi.string(),
  }),
  '/signup': Joi.object().keys({
    login: Joi.string(),
    password: Joi.string(),
    email: Joi.string().email().optional(),
    invitedBy: Joi.string().optional(),
    birth: Joi.date().max('12-20-1996'),
    sex: Joi.string().regex(/(?:male|female)/),
    agreedWithTerms: Joi.boolean().valid(true)
  }),
  '/drinks': Joi.object().keys({
    name: Joi.string().min(3).max(50),
    strength: Joi.number().positive(),
    code: Joi.string().regex(/^[a-z0-9]+$/i),
    alcoholic: Joi.any().when('strength', {is: Joi.number().greater(0), then: Joi.boolean().valid(true)})
  }),
};

exports.check = function (schema, body) {
  if (!schemas[schema])  return {};

  return Joi.validate(body, schemas[schema], { presence: 'required' });
};