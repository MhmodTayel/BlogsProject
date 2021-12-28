const User = require("../models/user");
const jwt = require("jsonwebtoken");

const find = () => User.find({});
const create = (user) => User.create(user);

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  const isValid = await user.comparePassword(password);

  if (!isValid) {
    throw "UN_AUTH";
  }
  return {
    token: jwt.sign(
      {
        username,
        _id: user._id,
        maxAge: "2d",
      },
      process.env.SECRET
    )
  };
};

module.exports = { find, create, login };
