const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, roleService } = require('../services');
const { RecordStatusEnum } = require('../utils/constants');

const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);
  res.status(httpStatus.CREATED).send(role);
});

const getRoles = catchAsync(async (req, res) => {
  const filter = {
    ...pick(req.query, ['name', 'description']),
   recordStatus: RecordStatusEnum.Active
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await roleService.queryRoles(filter, options);
  res.send(result);
});

const getRole = catchAsync(async (req, res) => {
  const role = await roleService.getRoleById(req.params.roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  res.send(user);
});

const deleteRole = catchAsync(async (req, res) => {
  await roleService.deleteRoleById(req.params.roleId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRole,
  getRoles,
  getRole,
  deleteRole,
};
