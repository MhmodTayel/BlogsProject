const User = require("../models/user");
const jwt = require("jsonwebtoken");

const find = (query) => User.find(query);
const create = (user) => {
  
  return User.create(user);
};

const login = async ({ username, password },next) => {
  const user = await User.findOne({ username });
  if(!user) {next('invalid user'); return;}
  const isValid = await user.comparePassword(password);

  if (!isValid) {
    next('Worng Password'); return;
  }
  return jwt.sign(
    {
      username,
      _id: user._id,
      maxAge: "2d",
    },
    process.env.SECRET
  );
};

const update = (_id, username) =>
  User.updateOne({ _id }, { $push: { following: username } });

const updateLike = (_id, blogId) =>
  User.updateOne({ _id }, { $push: { likes: blogId } });


const getFollowing = (_id) => User.findOne({ _id }, { following: 1 });
const getLikes = (_id) => User.findOne({ _id }, { likes: 1 });

module.exports = { find, create, login, update, getFollowing,updateLike,getLikes };
