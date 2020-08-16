const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.register = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  return res.render("register_page", {
    title: "Register",
  });
};

module.exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  return res.render("login_page", {
    title: "Login",
  });
};

module.exports.create = async (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  await User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      console.log("Error in finding user in sign up!");
      return;
    }

    if (!user) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          User.create(
            {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            },
            (err, user) => {
              if (err) {
                console.log("Error creating user");
                return;
              }

              return res.redirect("/users/login");
            }
          );
        });
      });
    } else {
      return res.redirect("back");
    }
  });
};

module.exports.update = (req, res) => {
  if (req.params.id != req.user.id) {
    return res.status(401).send("Unauthorized");
  }

  return res.render("reset_password", {
    title: "Reset Password",
  });
};

module.exports.reset = async (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  await User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log("Error in finding user while updating");
      return;
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        user.password = hash;
        user.save();
        req.flash("success", "Password Successfully Changed");
        return res.redirect("/");
      });
    });
  });
};

module.exports.createSession = (req, res) => {
  req.flash("success", "Logged In Successfully");
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout();
  req.flash("error", "You have logged out");
  return res.redirect("/users/login");
};
