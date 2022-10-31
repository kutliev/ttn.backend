const Roles = {
  USER: "USER",
  ADMIN: "ADMIN",
};

const Methods = {
  OPTIONS: "OPTIONS",
  GET: "GET",
  POST: "POST",
};

const Statuses = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const SALT = 3;

module.exports = {
  Roles,
  Statuses,
  Methods,
  SALT,
};
