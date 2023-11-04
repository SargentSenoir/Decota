const mongoose = require('mongoose');
const baseSchema = require('./common/baseschema');
const Schema = mongoose.Schema;

// Define the Organization schema by cloning from a base schema and adding fields.
const organizationSchema = baseSchema.clone().add({
  name: {
    type: String,
    required: true, 
    unique: true,
    trim: true,      
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  contact: {
    email: String,
    phone: String,
  },
  // Hierarchical structure
  parentOrganization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
  },
  // Additional organization details
  foundedYear: Number,
  revenue: Number,
  ceo: String,
  website: String,
  socialMedia: {
    facebook: String,
    twitter: String,
    linkedIn: String,
    instagram: String,
  },
  // Other organization-specific fields
});

/**
 * The 'Organization' model represents organizations in the application.
 * It includes various fields for organization details and hierarchical relationships.
 *
 * @model Organization
 */

// Define and export the Organization model
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;

/**
 * Find child organizations given a parent organization's ObjectId.
 *
 * @param {ObjectId} parentId - The ObjectId of the parent organization.
 * @returns {Promise} A Promise that resolves to an array of child organizations.
 * @throws {Error} Throws an error if the parent organization is not found.
 */
organizationSchema.statics.findChildOrganizations = async function (parentId) {
  const childOrgs = await this.find({ parentOrganization: parentId }).exec();
  if (!childOrgs) {
    throw new Error('Parent organization not found or has no child organizations.');
  }
  return childOrgs;
};

/**
 * Add a member to the organization.
 *
 * @param {ObjectId} memberId - The ObjectId of the user to be added as a member.
 * @returns {Promise} A Promise that resolves to the updated organization.
 * @throws {Error} Throws an error if the member cannot be added.
 */
organizationSchema.methods.addMember = async function (memberId) {
  this.members.push(memberId);
  try {
    await this.save();
    return this;
  } catch (error) {
    throw new Error('Failed to add a member to the organization.');
  }
};

/**
 * Update the organization's contact information.
 *
 * @param {Object} contactInfo - An object containing updated contact information.
 * @returns {Promise} A Promise that resolves to the updated organization.
 * @throws {Error} Throws an error if the contact information cannot be updated.
 */
organizationSchema.methods.updateContactInfo = async function (contactInfo) {
  this.contact = { ...this.contact, ...contactInfo };
  try {
    await this.save();
    return this;
  } catch (error) {
    throw new Error('Failed to update the organization\'s contact information.');
  }
};