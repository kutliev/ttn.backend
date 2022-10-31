const Router = require("express");
const { Roles } = require("./constants");
const router = new Router();
const authController = require("./controllers/auth");
const {
  credentialsCheck,
  authorizedOnly,
  onlyByRoles,
} = require("./middleware");

router.post("/signup", [...credentialsCheck], authController.signUp);

router.post("/signin", [...credentialsCheck], authController.singIn);

router.get(
  "/",
  [authorizedOnly, onlyByRoles([Roles.USER])],
  authController.list
);

module.exports = router;
