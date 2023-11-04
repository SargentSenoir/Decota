const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { organisationService } = require('../services');

const createOrganisation = catchAsync(async (req, res) => {
  const user = await userSrvice.createOrganisation(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getOrganisations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await organisationService.queryOrganisation(filter, options);
  res.send(result);
});

const getOrganisation = catchAsync(async (req, res) => {
  const user = await organisationService.getOrganisationById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateOrganisation = catchAsync(async (req, res) => {
  const user = await organisationService.updateOrganisationById(req.params.orgId, req.body);
  res.send(user);
});

const deleteOrganisation = catchAsync(async (req, res) => {
  await organisationService.deleteOrganisation(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOrganisation,
  getOrganisations,
  getOrganisation,
  updateOrganisation,
  deleteOrganisation
};
