const express = require("express");
const router = express.Router();

const UsersController = require("../../controllers/users_controller");

router.get("/register", UsersController.register);
router.get("/login", UsersController.login);

module.exports = router;
