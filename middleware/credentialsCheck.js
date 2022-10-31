const { check } = require("express-validator");

const CredentialsCheck = [
  check("username", "Empty username is not allowed").notEmpty(),
  check("password", "Must be 3 to 8 characters").isLength({ min: 3, max: 8 }),
];

module.exports = CredentialsCheck;
