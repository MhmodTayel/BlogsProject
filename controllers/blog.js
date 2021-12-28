const Blog = require("../models/blog");

const find = () => Blog.find({});
const create = (blog) => Blog.create(blog);
module.exports = { find, create };
