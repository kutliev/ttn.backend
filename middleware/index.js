const credentialsCheck = require('./credentialsCheck');
const { authorizedOnly, onlyByRoles } = require('./authMiddleware');

module.exports = {
  credentialsCheck,
  authorizedOnly,
  onlyByRoles,
}
