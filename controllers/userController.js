const usersStorage = require("../storages/userStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "Must Contains Only Letter.";
const lengthErr = "Must Be Between 1 to 6 Characters.";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 6 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 6 })
    .withMessage(`Last name ${lengthErr}`),
  body("email")
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),
  body("age")
    .optional()
    .isInt({ min: 18, max: 30 })
    .withMessage("Age must be a number between 18 and 30."),
];

exports.userListGet = (req, res) => {
  res.render("index", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
};

exports.createUserGet = (req, res) => {
  res.render("createUser", {
    title: "Create User",
  });
};

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.searchUserGet = (req, res) => {
  const { name, email } = req.query;
  console.log("name:", name, "email:", email);
  const user = usersStorage.searchUser({ name, email });
  console.log("user", user);

  res.render("search", {
    title: "Searched User",
    users: user,
  });
};

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
};

exports.userCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age } = req.body;
    usersStorage.addUser({ firstName, lastName, email, age });
    res.redirect("/");
  },
];
exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName, email, age });
    res.redirect("/");
  },
];
