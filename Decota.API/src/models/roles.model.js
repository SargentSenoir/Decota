const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const baseschema = require('./common/baseschema');

const rolesSchema = baseschema.clone().add(
  {
    name: {
        type: String,
        unique: true,
        required: true,
      },
      description: String,
      permissions: [
        {
          name: String, // The name of the permission
          description: String, // A description of the permission
        },
      ],
      assignable: {
        type: Boolean,
        default: false
      }, // Whether this role can be assigned to users
      isDefault: {
        type: Boolean,
        default: false
      } // Whether this is the default role for new users

  }
);

rolesSchema.plugin(toJSON);
rolesSchema.plugin(paginate);

/**
 * Find the default role among user roles.
 *
 * @return {Promise} A Promise that resolves to the default role or null.
 */
rolesSchema.statics.findDefaultRole = async function () {
    return await this.findOne({isDefault: true})
}

/**
 * Add a permission to the role's permissions array.
 *
 * @param {String} permission - The name of the permission to add.
 */
rolesSchema.methods.addPermission = function (permission) {
    if (!this.permissions.find(p => p.name === permission)) {
      this.permissions.push({ name: permission });
    }
  };
  
/**
 * Remove a permission from the role's permissions array.
 *
 * @param {String} permission - The name of the permission to remove.
 */
rolesSchema.methods.removePermission = function (permission) {
    this.permissions = this.permissions.filter(p => p.name !== permission);
};
  
/**
 * Check if the role has a specific permission.
 *
 * @param {String} permission - The name of the permission to check.
 * @return {Boolean} A boolean indicating whether the role has the specified permission.
 */
rolesSchema.methods.hasPermission = function (permission) {
    return this.permissions.some(p => p.name === permission);
};

/**
 * @typedef Roles
 */
const Roles = mongoose.model('Roles', rolesSchema);

module.exports = Roles;
