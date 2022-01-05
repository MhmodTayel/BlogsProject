const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  console.log(req.url);
  if ((req.url == "/" || /[0-9]+$/.test(req.url)) && req.method == "GET") {
    next();
  } else {
    const { authorization } = req.headers;

    const payload = await jwt.verify(authorization, process.env.SECRET);

    User.findOne({ username: payload.username }).then((user) => {
      req.user = user;

      next();
    });
  }
};

module.exports = auth;
