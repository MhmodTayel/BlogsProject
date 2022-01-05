const Blog = require("../models/blog");
const User = require("../models/user");

const authorizeBlogMW = async (req, res, next) => {
  const userId = req.user._id.toString();
  const username = req.user.username;

  async function isAdmin(_id, res, next) {
    const user = await User.findOne({ _id });
    if (user.isAdmin) {
      next();
    } else {
      const blogId = req.params.id;
      const doc = await Blog.findOne({ _id: blogId });
      const blogAuthorID = doc.author;
      const blogAuthor = await User.findOne({ _id: blogAuthorID });

      if (blogAuthor.username != username)
        res.json(
          "you don't have the permission");
      next();
    }
  }
  isAdmin(userId, res, next);
};

module.exports = authorizeBlogMW;
