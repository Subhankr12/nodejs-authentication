module.exports.register = (req, res) => {
  return res.render("register_page", {
    title: "Register",
  });
};

module.exports.login = (req, res) => {
  return res.render("login_page", {
    title: "Login",
  });
};
