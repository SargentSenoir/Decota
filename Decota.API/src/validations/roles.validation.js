const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    descriotion: Joi.string(),
    Permissions: Joi.array().items(Joi.object().keys({
        name: Joi.string(),
        description: Joi.string()
    }).when('.', {
        is: Joi.array().min(1), // Check if there is at least one object in the array
        then: Joi.object({
          name: Joi.string().required(),
          description: Joi.number().integer().required(),
        }),
      })
    )
  }),
};

const getRoles = {
  query: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getRole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

const deleteRole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRole,
  getRoles,
  getRole,
  deleteRole
};
