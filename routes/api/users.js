const express = require("express");
const router = express.Router();
const passport = require("passport");

const UsersController = require("../../controllers/users_controller");

//get requests for register and login
router.get("/register", UsersController.register);
router.get("/login", UsersController.login);

//post requests for creating user and creating session
router.post("/create", UsersController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  UsersController.createSession
);

//requests for resetting password of the user
router.get("/update/:id", passport.checkAuthentication, UsersController.update);
router.post("/reset", UsersController.reset);
//get request for logout
router.get("/logout", UsersController.destroySession);

//google auth requests
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
