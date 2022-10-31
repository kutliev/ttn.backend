const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Role = require("../models/Role");
const { Roles, Statuses, SALT } = require("../constants");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async singIn(req, res) {
    try {
      const { username, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(Statuses.BAD_REQUEST)
          .json({ message: "Sign in failed", errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(Statuses.NOT_FOUND)
          .json({ message: "User not found" });
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        return res
          .status(Statuses.NOT_FOUND)
          .json({ message: "Incorrect password" });
      }

      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log("***ERROR", e);
      res.status(Statuses.BAD_REQUEST).json({ message: "Sign in error" });
    }
  }
  async signUp(req, res) {
    try {
      const { username, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(Statuses.BAD_REQUEST)
          .json({ message: "Sign up failed", errors });
      }

      const maybeUser = await User.findOne({ username });
      if (maybeUser) {
        return res
          .status(Statuses.BAD_REQUEST)
          .json({ message: "This username is not allowed" });
      }

      const hashedPassword = bcrypt.hashSync(password, SALT);
      const userRole = await Role.findOne({ value: Roles.USER });
      const user = new User({
        username,
        password: hashedPassword,
        roles: [userRole.value],
      });
      await user.save();

      return res.json(user);
    } catch (e) {
      console.log("***ERROR", e);
      res.status(Statuses.BAD_REQUEST).json({ message: "Sign up error" });
    }
  }
  async list(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log("***ERROR", e);
      res.status(Statuses.BAD_REQUEST).json({ message: "List error" });
    }
  }
}

module.exports = new authController();
