const jwt = require("jsonwebtoken");
const { Methods, Statuses } = require("../constants");
const { secret } = require("../controllers/config");

const notAuthorizedResponse = (res, log) => {
  console.log("***AUTH MIDDLEWARE", log);
  return res
    .status(Statuses.NOT_AUTHORIZED)
    .json({ message: "User is not authorized" });
};

const fetchToken = (req) => {
  try {
    return req.headers.authorization.split(" ")[1];
  } catch {
    return null;
  }
};

const authorizedOnly = (req, res, next) => {
  if (req.method === Methods.OPTIONS) {
    next();
  }

  try {
    const token = fetchToken(req);

    if (!token) {
      return notAuthorizedResponse(res, "NO TOKEN");
    }

    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (e) {
    return notAuthorizedResponse(res, e);
  }
};

const onlyByRoles = (roles) => (req, res, next) => {
  if (req.method === Methods.OPTIONS) {
    next();
  }

  try {
    const token = fetchToken(req);

    if (!token) {
      return notAuthorizedResponse(res, "NO TOKEN");
    }

    const { roles: userRoles } = jwt.verify(token, secret);
    let hasRole = false;
    userRoles.forEach((userRole) => {
      if (roles.includes(userRole)) {
        hasRole = true;
      }
    });

    if (!hasRole) {
      return notAuthorizedResponse(res, "NO ROLE");
    }

    next();
  } catch (e) {
    return notAuthorizedResponse(res, e);
  }
};

module.exports = {
  authorizedOnly,
  onlyByRoles,
};
