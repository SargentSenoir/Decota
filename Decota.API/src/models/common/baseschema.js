const mongoose = require('mongoose');
const { recordStatusList } = require('../../utils/constants');

const baseSchema = new mongoose.Schema({
  recordStatus: {
    type: String,
    enum: recordStatusList,
    default: 'active',
  },

  //unique id to reference that related organisation
  organisationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisations',
    unique: true,
    required: true
  }
  // Add other common fields here
},
{
  timestamps: true,
});

module.exports = baseSchema;