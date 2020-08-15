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
router.get("/update/:id", passport.checkAuthentication, UsersController.update);
router.post("/reset", UsersController.reset);
router.get("/logout", UsersController.destroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/login" }),
  UsersController.createSession
);

module.exports = router;
