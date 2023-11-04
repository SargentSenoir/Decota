const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrganisation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.object().keys({
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        postalCode: Joi.string(),
        country: Joi.string()
    }),
    contact: Joi.object().keys({
        email: Joi.string().required(),
        phone: Joi.number()
    }),
    parantOrganisation: Joi.custom(objectId),
    foundedYear: Joi.number().integer(),
    revenue: Joi.number(),
    ceo: Joi.string(),
    website: Joi.string(),
    socialMedia: Joi.object().keys({
        facebook: Joi.string(),
        twitter: Joi.string(),
        linkedIn: Joi.string(),
        instagram: Joi.string()
    })
  }),
};

const getOrganisations = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrganisation = {
  params: Joi.object().keys({
    orgId: Joi.string().custom(objectId),
  }),
};

const deleteOrganisation = {
  params: Joi.object().keys({
    orgId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrganisation,
  getOrganisations,
  getOrganisation,
  deleteOrganisation
};
