const Blog = require("../models/blog");
const User = require("../models/user");

const authorizeBlogMW = async (req, res, next) => {
  const userId = req.user._id.toString();
  console.log("authorizeBlogMW", req.user);
  async function isAdmin(_id, res, next) {
    const user = await User.findOne({ _id });
    if (user.isAdmin) {
      next();
    } else {
      const blogId = req.params.id;
      const doc = await Blog.findOne({ _id: blogId });
      const blogAuthor = doc.author;

      if (blogAuthor != req.user.username)
        res.json("you don't have the permission");
      next();
    }
  }
  isAdmin(userId, res, next);
};

module.exports = authorizeBlogMW;
