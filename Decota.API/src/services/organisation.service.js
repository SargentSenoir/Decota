const { Organisation } = require("../models");
const { RecordStatusEnum } = require("../utils/constants");

/**
 * Create a new organization.
 *
 * @param {Object} orgBody - The organization data to be created.
 * @returns {Promise} A Promise that resolves to the created organization.
 */
const createOrganisation = async (orgBody) => await Organization.create(orgBody);

/**
 * Query organizations based on filter criteria and options.
 *
 * @param {Object} filter - The filter criteria for querying organizations.
 * @param {Object} options - The pagination and sorting options.
 * @returns {Promise} A Promise that resolves to the query result.
 */
const queryOrganisation = async (filter, options) => {
    let result = await Organisation.paginate(filter, options)
    return result;
}

/**
 * Retrieve an organization by its unique identifier.
 *
 * @param {string} id - The unique identifier of the organization to retrieve.
 * @returns {Promise} A Promise that resolves to the organization or null if not found.
 */
const getOrganisationById = async (id) => await Organisation.findById(id);

/**
 * Update an organization by its unique identifier.
 *
 * @param {string} orgId - The unique identifier of the organization to update.
 * @param {Object} updateBody - The updated organization data.
 * @returns {Promise} A Promise that resolves to the updated organization or throws an error if the organization is not found.
 */
const updateOrganisationById = async (orgId, updateBody) => {
    const org = await getOrganisationById(orgId);
    if (!org) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Organisation not found');
    }
    Object.assign(org, updateBody);
    await org.save();
    return org;
  };

/**
 * Delete an organization by setting its recordStatus to 'Deleted'.
 *
 * @param {string} id - The unique identifier of the organization to delete.
 * @returns {Promise} A Promise that resolves after the organization is deleted.
 */
const deleteOrganisationById = async (id) => await Organisation.updateOne(
    {_id: id},
    {$set: {recordStatus: RecordStatusEnum.Deleted}}
    )

    
module.exports = {
    createOrganisation,
    queryOrganisation,
    getOrganisationById,
    updateOrganisationById,
    deleteOrganisationById
};