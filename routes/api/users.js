const express = require("express");
const router = express.Router();
const passport = require("passport");

const UsersController = require("../../controllers/users_controller");

router.get("/register", UsersController.register);
router.get("/login", UsersController.login);
router.post("/create", UsersController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  UsersController.createSession
);
router.get("/logout", UsersController.destroySession);

module.exports = router;
