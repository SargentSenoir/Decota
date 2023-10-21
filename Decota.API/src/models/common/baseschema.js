const mongoose = require('mongoose');
const { recordStatusList } = require('../../utils/constants');

const baseSchema = new mongoose.Schema({
  recordStatus: {
    type: String,
    enum: recordStatusList,
    default: 'active',
  },
  // Add other common fields here
},
{
  timestamps: true,
});

module.exports = baseSchema;