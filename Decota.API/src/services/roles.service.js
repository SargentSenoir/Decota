const httpStatus = require('http-status');
const { User,Role } = require('../models');
const ApiError = require('../utils/ApiError');
const { RecordStatusEnum } = require('../utils/constants');

/**
 * Create a role
 * @param {Object} roleBody
 * @returns {Promise<Role>}
 */
const createRole = async (roleBody) => await Role.create(roleBody)

/**
 * Query for roles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRoles = async (filter, options) => {
  const role = await Role.paginate(filter, options);
  return role;
};

/**
 * Get role by id
 * @param {ObjectId} id
 * @returns {Promise<Role>}
 */
const getRoleById = async (id) => {
  return Role.findById(id);
};

/**
 * Get role by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getRoleByName = async (name) => {
  return Role.findOne({ name });
};

/**
 * Delete role by id
 * @param {ObjectId} roleId
 * @returns {Promise<Role>}
 */
const deleteRoleById = async (roleId) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  await role.updateOne({$set: {recordStatus: RecordStatusEnum.Deleted}});
  return role;
};

module.exports = {
  createRole,
  queryRoles,
  getRoleById,
  getRoleByName,
  deleteRoleById,
};
