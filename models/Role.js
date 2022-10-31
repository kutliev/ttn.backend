const { Schema, model } = require('mongoose');
const Roles = require('../constants');

const Role = new Schema({
  value: { type: String, unique: true, default: Roles.USER },
});

module.exports = model('Role', Role);
