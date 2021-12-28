const Blog = require("../models/blog");

const find = () => Blog.find({});
const create = (blog) => Blog.create(blog);
const deleteDoc = (id) => {
  return Blog.deleteOne({ id });
};
const update = (id, body) => Blog.updateOne({ id }, body);
module.exports = { find, create, deleteDoc, update };
